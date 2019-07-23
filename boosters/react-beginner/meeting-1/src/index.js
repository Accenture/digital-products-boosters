import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app";
import data from "./data.json";

ReactDOM.render(
  <App newsItems={data.newsItems} />,
  document.getElementById("root")
);
