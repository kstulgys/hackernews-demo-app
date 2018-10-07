import React, { Component, Fragment } from "react";
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
import LinkList from "./LinkList";
const FEED_SEARCH_QUERY = gql`
  query FeedSearchQuery($filter: String) {
    feed(where: { url_contains: $filter }) {
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
    links: "",
    filter: ""
  };

  executeSearch = async () => {
    const { filter } = this.state;
    const result = await this.props.client.query({
      query: FEED_SEARCH_QUERY,
      variables: { filter }
    });
    const links = filter !== "" ? result.data.feed.links : "";

    this.setState({ links });
  };

  handleSearch = e => {
    const { value } = e.target;
    setTimeout(() => {
      this.setState({ filter: value });
      if (this.state.filter) {
        this.executeSearch();
      } else {
        this.setState({ links: "" });
      }
      console.log("executed");
    }, 350);
  };

  render() {
    // const { links } = this.state;
    return (
      <Fragment>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Input
            style={{ width: 410 }}
            placeholder="Search links..."
            onChange={this.handleSearch}
          />
          {/* <button onClick={this.handleSearch}>Search</button> */}
        </div>
        <LinkList searchTermLinks={this.state.links} />
      </Fragment>
    );
  }
}

export default withApollo(Search);
