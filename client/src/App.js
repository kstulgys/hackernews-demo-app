import React, { Component } from "react";
import LinkList from "./components/LinkList";
import Nav from "./components/Nav";
import Search from "./components/Search";

import logo from "./logo.svg";
// import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        <Search />
        <LinkList />
      </div>
    );
  }
}

export default App;
