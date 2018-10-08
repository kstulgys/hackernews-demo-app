import React, { Component, Fragment } from "react";
import { withApollo } from "react-apollo";
import gql from "graphql-tag";
import {
  Textarea,
  TextField,
  Label,
  MediaFigure,
  Input,
  FauxInput
} from "@zendeskgarden/react-textfields";
import { Button } from "@zendeskgarden/react-buttons";
import { Grid, Row, Col } from "@zendeskgarden/react-grid";
import { Well } from "@zendeskgarden/react-notifications";
import DownShift from "downshift";
import { FaSearch } from "react-icons/fa";
import { Dots } from "@zendeskgarden/react-loaders";
import debounce from "lodash.debounce";

const FEED_SEARCH_QUERY = gql`
  query FeedSearchQuery($filter: String) {
    feed(
      where: {
        OR: [{ url_contains: $filter }, { description_contains: $filter }]
      }
    ) {
      links {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;

class Search extends Component {
  state = {
    links: [],
    loading: false
  };
  handleSearch = debounce(async e => {
    console.log("searching...");

    this.setState({ loading: true });
    const res = await this.props.client.query({
      query: FEED_SEARCH_QUERY,
      variables: { filter: e.target.value }
    });
    this.setState({ links: res.data.feed.links, loading: false });
  }, 300);

  render() {
    return (
      <Grid>
        <Row justifyContent="center">
          <Col size={12} md={5} sm={7}>
            <DownShift>
              {({
                getInputProps,
                getItemProps,
                isOpen,
                inputValue,
                highlightedIndex
              }) => (
                <div>
                  <FauxInput mediaLayout>
                    <MediaFigure style={{ width: 25 }}>
                      {this.state.loading ? <Dots size="20px" /> : <FaSearch />}
                    </MediaFigure>
                    <Input
                      bare
                      {...getInputProps({
                        type: "search",
                        placeholder: "Search links...",
                        onChange: e => {
                          e.persist();
                          this.handleSearch(e);
                        }
                      })}
                    />
                  </FauxInput>
                  <div
                    style={{
                      position: "absolute",
                      zIndex: 10,
                      left: 0,
                      width: "100%"
                    }}
                  >
                    {this.state.links &&
                      isOpen &&
                      this.state.links.map((link, index) => (
                        <Well floating style={{ padding: 0, width: "100%" }}>
                          <Button
                            key={link.id}
                            stretched
                            basic
                            style={{
                              display: "flex",
                              flexDirection: "column"
                            }}
                          >
                            <div>
                              <p>{link.url}</p>
                              <p>{link.description}</p>
                            </div>
                          </Button>
                        </Well>
                      ))}
                  </div>
                </div>
              )}
            </DownShift>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default withApollo(Search);
