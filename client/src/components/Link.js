import React, { Component } from "react";
import { Well, Title, Notification } from "@zendeskgarden/react-notifications";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { FEED_QUERY } from "./LinkList";
class Link extends Component {
  updateStoreAfterVote = (store, payload, linkId) => {
    console.log(payload);
    let data = store.readQuery({ query: FEED_QUERY });
    console.log(data);
    let votedLink = data.feed.links.find(link => link.id === linkId);
    console.log("votedLink", votedLink);

    votedLink.votes = payload.data.vote.link.votes;
    store.writeQuery({ query: FEED_QUERY, data });
  };

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
          <Mutation
            mutation={VOTE_MUTATION}
            variables={{ linkId: this.props.link.id }}
            update={(store, payload) =>
              this.updateStoreAfterVote(store, payload, this.props.link.id)
            }
            // optimisticResponse={{
            //   __typename: "Mutation",
            //   vote: {
            //     linkId: this.props.link.id,
            //     __typename: "Vote",
            //   }
            // }}
          >
            {(VoteMutation, { loading, error }) => (
              <FaAngleUp
                size={20}
                style={{ marginBottom: 10 }}
                onClick={() => {
                  VoteMutation().catch(err => alert(err.message));
                }}
              />
            )}
          </Mutation>

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
          <div>
            <p>{this.props.link.votes.length || 0} </p>
            <p>{this.props.link.createdAt} </p>
          </div>
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
      user {
        id
      }
    }
  }
`;

export default Link;

// <FaThumbsDown size={25} />
//
{
  /* <Mutation
mutation={VOTE_MUTATION}
variables={{ linkId: this.props.link.id }}
update={(store, { data: { vote } }) =>
  this.props.updateStoreAfterVote(store, vote, this.props.link.id)
}
>
{VoteMutation => (
  <FaThumbsUp
    size={25}
    style={{ marginLeft: 20 }}
    onClick={VoteMutation}
  />
)}
</Mutation> */
}
