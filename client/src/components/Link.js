import React, { Component } from "react";
import { Well } from "@zendeskgarden/react-notifications";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

class Link extends Component {
  render() {
    return (
      <Well floating>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <div style={{ paddingRight: 10 }}>
            <h3>{this.props.index + 1}</h3>
          </div>
          <div style={{ alignSelf: "flex-start" }}>
            <h3>{this.props.link.url}</h3>
            <p>{this.props.link.description}</p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <div>
              <h3>{this.props.link.votes.length || 0} </h3>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "nowrap"
              }}
            >
              <FaThumbsDown size={25} />

              <Mutation
                mutation={VOTE_MUTATION}
                variables={{ linkId: this.props.link.id }}
                update={(store, { data: { vote } }) =>
                  this.props.updateStoreAfterVote(
                    store,
                    vote,
                    this.props.link.id
                  )
                }
              >
                {VoteMutation => (
                  <FaThumbsUp
                    size={25}
                    style={{ marginLeft: 20 }}
                    onClick={VoteMutation}
                  />
                )}
              </Mutation>
            </div>
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
      # user {
      #   id
      # }
    }
  }
`;

export default Link;
