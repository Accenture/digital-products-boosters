import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app";
import ApolloClient from "apollo-boost";

const uri = "https://api.github.com/graphql";
const token = process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN;
const errorMessage =
  "Please set REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN environment variable in .env.local AND restart development server";
if (!token) throw new Error(errorMessage);

const headers = { authorization: `bearer ${token}` };
const client = new ApolloClient({ headers, uri });

ReactDOM.render(<App client={client} />, document.getElementById("root"));
