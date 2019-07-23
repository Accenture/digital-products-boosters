import React from "react";
import CommentsSection from "../comments-section";
import classNames from "./class-names.module.css";

const NewsImage = ({ comments, imageUrl, title }) => (
  <div className={classNames.root}>
    <img alt={title} className={classNames.image} src={imageUrl} />
    <CommentsSection comments={comments} />
  </div>
);

export default NewsImage;
