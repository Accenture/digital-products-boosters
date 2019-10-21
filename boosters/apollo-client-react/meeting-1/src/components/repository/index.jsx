import React from "react";
import StarButton from "../star-button";
import classNames from "./class-names.module.css";

const text = { created: "Created on: " };

const fragmentName = "Repository";
const fragment = `
  fragment ${fragmentName} on Repository {
    createdAt
    id
    name
    url
    viewerHasStarred
  }
`;

// YOU SHOULD NOT NEED TO UPDATE THIS COMPONENT
const RepositoryBase = ({ id, name, textCreated, url, viewerHasStarred }) => (
  <div className={classNames.root}>
    <div className={classNames.topSection}>
      <a href={url}>{name}</a>
      <StarButton id={id} name={name} viewerHasStarred={viewerHasStarred} />
    </div>
    <div>{textCreated}</div>
  </div>
);

// YOU SHOULD NOT NEED TO UPDATE THIS COMPONENT
const Repository = ({ createdAt, ...props }) => {
  const textCreated = text.created + createdAt.split("T")[0];
  const baseProps = { textCreated, ...props };
  return <RepositoryBase {...baseProps} />;
};

Repository.fragmentName = fragmentName;
Repository.fragment = fragment;

export default Repository;
