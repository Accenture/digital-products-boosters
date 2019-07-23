import React from "react";
import CommentsSection from "../comments-section";
import classNames from "./class-names.module.css";

const NewsVideo = ({ comments, title, videoUrl }) => (
  <div className={classNames.root}>
    <iframe className={classNames.video} src={videoUrl} title={title} />
    <CommentsSection comments={comments} />
  </div>
);

export default NewsVideo;
