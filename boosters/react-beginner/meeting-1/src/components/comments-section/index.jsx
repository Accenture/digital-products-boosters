import React from "react";
import Comment from "../comment";
import { makeTextComments } from "./utils";
import classNames from "./class-names.module.css";

const CommentsSectionBase = ({ comments, textComments }) => (
  <div>
    <div className={classNames.textComments}>{textComments}</div>
    {comments.map(comment => (
      <Comment key={comment.id} {...comment} />
    ))}
  </div>
);

const CommentsSection = ({ comments }) => {
  const baseProps = {
    comments,
    textComments: makeTextComments({ comments })
  };
  return <CommentsSectionBase {...baseProps} />;
};

export default CommentsSection;
