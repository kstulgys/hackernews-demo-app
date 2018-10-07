import React from "react";
import ReactDOM from "react-dom";
import "@zendeskgarden/react-grid/dist/styles.css";
import "@zendeskgarden/react-buttons/dist/styles.css";
import "@zendeskgarden/react-notifications/dist/styles.css";
import "@zendeskgarden/react-tabs/dist/styles.css";
import "@zendeskgarden/react-textfields/dist/styles.css";
import "@zendeskgarden/react-modals/dist/styles.css";

import "./index.css";
import App from "./App";
import { ThemeProvider } from "@zendeskgarden/react-theming";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import { AUTH_TOKEN } from "./constants";
// import * as serviceWorker from './serviceWorker';

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const httpLink = createHttpLink({
  uri: "http://localhost:4000"
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
