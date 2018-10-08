import React, { Component } from "react";
import Link from "./Link";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Button } from "@zendeskgarden/react-buttons";
import { Grid, Row, Col } from "@zendeskgarden/react-grid";
import {
  Modal,
  Header,
  Body,
  Footer,
  Close
} from "@zendeskgarden/react-modals";

class LinkList extends Component {
  updateCacheAfterVote = (store, createVote, linkId) => {
    const data = store.readQuery({ query: FEED_QUERY });
    const votedLink = data.feed.links.find(link => link.id === linkId);
    votedLink.votes = createVote.link.votes;
    store.writeQuery({ query: FEED_QUERY, data });
  };

  render() {
    return (
      <Grid>
        <Row justifyContent="center">
          <Query query={FEED_QUERY}>
            {({ loading, error, data }) => {
              if (loading) return <div>Fetching</div>;
              if (error) return <div>Error</div>;
              const allLinks = data.feed.links;

              return (
                <Col size={12} md={5} sm={7} style={{ marginTop: "10vh" }}>
                  {allLinks &&
                    allLinks.map((link, index) => (
                      <Row style={{ marginBottom: 15 }} key={link.id}>
                        <Col>
                          <Link
                            link={link}
                            index={index}
                            updateStoreAfterVote={this.updateCacheAfterVote}
                          />
                        </Col>
                      </Row>
                    ))}
                </Col>
              );
            }}
          </Query>
        </Row>
      </Grid>
    );
  }
}

export const FEED_QUERY = gql`
  {
    feed {
      links {
        id
        createdAt
        url
        description
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
export default LinkList;
