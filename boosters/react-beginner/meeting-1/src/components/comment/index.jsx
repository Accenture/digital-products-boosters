import React from "react";
import { makeUserFullName } from "./utils";

const CommentBase = ({ text, userFullName }) => (
  <div>
    <span>{text}</span>
    <span>{userFullName}</span>
  </div>
);

const Comment = ({ user, ...props }) => {
  const baseProps = {
    ...props,
    userFullName: makeUserFullName({ user })
  };
  return <CommentBase {...baseProps} />;
};

export default Comment;
