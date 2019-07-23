import React from "react";
import classNames from "./class-names.module.css";
import CommentsSection from "../comments-section";

const NewsText = ({ comments, text }) => (
  <div className={classNames.root}>
    <p>{text}</p>
    <CommentsSection comments={comments} />
  </div>
);

export default NewsText;
