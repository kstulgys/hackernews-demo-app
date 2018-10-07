import React, { Component } from "react";
import { withApollo } from "react-apollo";
import gql from "graphql-tag";
import {
  Textarea,
  TextField,
  Label,
  Hint,
  Input,
  Message
} from "@zendeskgarden/react-textfields";

const FEED_SEARCH_QUERY = gql`
  query FeedSearchQuery($filter: String!) {
    feed(filter: $filter) {
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
    filter: ""
  };

  render() {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <input
          style={{ width: 410 }}
          placeholder="Search links..."
          onChange={e => this.setState({ filter: e.target.value })}
        />
        <button onClick={() => this._executeSearch()}>search</button>
      </div>
    );
  }
  _executeSearch = async () => {
    const { filter } = this.state;
    const result = await this.props.client.query({
      query: FEED_SEARCH_QUERY,
      variables: { filter }
    });
    const links = result.data.feed.links;
    this.setState({ links });
  };
}

export default withApollo(Search);
