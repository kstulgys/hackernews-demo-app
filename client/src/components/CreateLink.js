import React, { Component, Fragment } from "react";
import {
  Textarea,
  TextField,
  Label,
  Hint,
  Input,
  Message
} from "@zendeskgarden/react-textfields";
import { Tab, TabList } from "@zendeskgarden/react-tabs";

import { Grid, Row, Col } from "@zendeskgarden/react-grid";
import { Button } from "@zendeskgarden/react-buttons";
import {
  Modal,
  Header,
  Body,
  Footer,
  Close,
  FooterItem
} from "@zendeskgarden/react-modals";

import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { FEED_QUERY } from "./LinkList";

class CreateLink extends Component {
  state = {
    description: "",
    url: "",
    isModalVisible: false
  };

  onModalClose = () => this.setState({ isModalVisible: false });

  render() {
    const { description, url } = this.state;
    return (
      <Fragment>
        <Tab disabled onClick={() => this.setState({ isModalVisible: true })}>
          Create Link
        </Tab>

        {this.state.isModalVisible && (
          <Modal onClose={this.onModalClose}>
            <Header>Focus Jail Container</Header>
            <Body>
              <TextField>
                <Label>Url</Label>
                <Input
                  placeholder="Focus will be locked in this modal"
                  onChange={e => this.setState({ url: e.target.value })}
                />
              </TextField>
              <TextField>
                <Label>Description</Label>
                <Textarea
                  placeholder="Focus will be locked in this modal"
                  onChange={e => this.setState({ description: e.target.value })}
                />
              </TextField>
            </Body>
            <Footer>
              <FooterItem>
                <Button onClick={this.onModalClose} basic>
                  Cancel
                </Button>
              </FooterItem>
              <FooterItem>
                <Mutation
                  mutation={POST_MUTATION}
                  variables={{ description, url }}
                  //   onCompleted={() => this.props.history.push("/")}
                  update={(store, { data: { post } }) => {
                    const data = store.readQuery({ query: FEED_QUERY });
                    data.feed.links.unshift(post);
                    store.writeQuery({
                      query: FEED_QUERY,
                      data
                    });
                  }}
                >
                  {PostMutation => (
                    <Button primary onClick={PostMutation}>
                      Confirm
                    </Button>
                  )}
                </Mutation>
              </FooterItem>
            </Footer>
            <Close aria-label="Close modal" />
          </Modal>
        )}
      </Fragment>
    );
  }
}

const POST_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      url
      description
      votes {
        id
      }
      postedBy {
        id
        name
      }
    }
  }
`;
export default CreateLink;
