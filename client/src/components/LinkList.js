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

const FEED_QUERY = gql`
  query FEED_QUERY {
    feed {
      links {
        id
        url
        createdAt
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
class LinkList extends Component {
  render() {
    return (
      <Grid>
        <Row justifyContent="center">
          <Query query={FEED_QUERY}>
            {({ data, loading, error }) => {
              if (loading) return <div>Fetching</div>;
              if (error) return <div>Error</div>;
              return (
                <Col size={12} md={5} sm={7} style={{ marginTop: "10vh" }}>
                  {data.feed.links !== [] &&
                    data.feed.links.map((link, index) => (
                      <Row style={{ marginBottom: 15 }} key={link.id}>
                        <Col>
                          <Link link={link} index={index} />
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

export default LinkList;

export { FEED_QUERY };
