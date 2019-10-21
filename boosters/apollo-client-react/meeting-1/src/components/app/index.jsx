import { ApolloProvider } from "@apollo/react-hooks";
import React from "react";
import Greeting from "../greeting";
import Repositories from "../repositories";
import UserSection from "../user-section";
import classNames from "./class-names.module.css";

// YOU SHOULD NOT NEED TO UPDATE THIS COMPONENT
const App = ({ client }) => (
  <div className={classNames.root}>
    <ApolloProvider client={client}>
      <Greeting />
      <Repositories />
      <UserSection />
    </ApolloProvider>
  </div>
);

export default App;
