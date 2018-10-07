import React, { Component } from "react";
import { Tab, TabList } from "@zendeskgarden/react-tabs";
import CreateLink from "./CreateLink";
import LogIn from "./LogIn";
import { AUTH_TOKEN } from "../constants";

class Nav extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
        <TabList>
          <Tab selected active>
            Feed
          </Tab>
          <CreateLink />
          <LogIn />
          <Tab disabled>Profile</Tab>
        </TabList>
      </div>
    );
  }
}

export default Nav;
