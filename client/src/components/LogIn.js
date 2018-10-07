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
import { AUTH_TOKEN } from "../constants";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

class Login extends Component {
  state = {
    login: true, // switch between Login and SignUp
    email: "",
    password: "",
    name: ""
  };

  _confirm = async data => {
    const { token } = data.signup;
    // const { token } = this.state.login ? data.login : data.signup;
    this.setState({
      login: false,
      email: "",
      password: "",
      name: ""
    });
    this._saveUserData(token);
    // this.props.history.push(`/`);
  };

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token);
  };

  onModalClose = () => this.setState({ isModalVisible: false });

  render() {
    const { login, email, password, name } = this.state;
    return (
      <Fragment>
        <Tab onClick={() => this.setState({ isModalVisible: true })}>
          Log In
        </Tab>

        {this.state.isModalVisible && (
          <Modal onClose={this.onModalClose}>
            <Header>
              {login ? "Please login" : "Please create an account"}
            </Header>
            <Body>
              {!login && (
                <TextField>
                  <Label>Name</Label>
                  <Input
                    placeholder="Focus will be locked in this modal"
                    onChange={e => this.setState({ name: e.target.value })}
                  />
                </TextField>
              )}
              <TextField>
                <Label>Email</Label>
                <Input
                  placeholder="Focus will be locked in this modal"
                  onChange={e => this.setState({ email: e.target.value })}
                />
              </TextField>
              <TextField>
                <Label>Password</Label>
                <Input
                  placeholder="Focus will be locked in this modal"
                  onChange={e => this.setState({ password: e.target.value })}
                />
              </TextField>
            </Body>
            <Footer>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between"
                }}
              >
                <Button basic onClick={() => this.setState({ login: !login })}>
                  {login
                    ? "need to create an account?"
                    : "already have an account?"}
                </Button>

                <Mutation
                  mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
                  variables={{ email, password, name }}
                  onCompleted={data => this._confirm(data)}
                >
                  {mutation => (
                    <Button primary onClick={mutation}>
                      Confirm
                    </Button>
                  )}
                </Mutation>
              </div>
            </Footer>
            <Close aria-label="Close modal" />
          </Modal>
        )}
      </Fragment>
    );
  }
}

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export default Login;
