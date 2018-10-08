import React, { Component } from "react";
import { Well, Title, Notification } from "@zendeskgarden/react-notifications";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

class Link extends Component {
  render() {
    return (
      <Well
        floating
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#5293C7",
          color: "#F8F9F9"
        }}
      >
        <p>{this.props.index + 1}</p>

        <div
          style={{
            flexBasis: "15%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <FaAngleUp size={20} style={{ marginBottom: 10 }} />
          <FaAngleDown size={20} />
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignContent: "space-between"
            // alignItems: "center"
          }}
        >
          <h3>{this.props.link.url}</h3>
          <p> {this.props.link.description}</p>
          <p>{this.props.link.votes.length || 0} </p>
        </div>
      </Well>
    );
  }
}

const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        votes {
          id
          user {
            id
          }
        }
      }
      # user {
      #   id
      # }
    }
  }
`;

export default Link;
// <FaThumbsDown size={25} />
//
// <Mutation
// mutation={VOTE_MUTATION}
// variables={{ linkId: this.props.link.id }}
// update={(store, { data: { vote } }) =>
//   this.props.updateStoreAfterVote(store, vote, this.props.link.id)
// }
// >
// {VoteMutation => (
//   <FaThumbsUp
//     size={25}
//     style={{ marginLeft: 20 }}
//     onClick={VoteMutation}
//   />
// )}
// </Mutation>
