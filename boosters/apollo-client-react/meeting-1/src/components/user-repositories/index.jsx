import React from "react";
import Repository from "../repository";
import classNames from "./class-names.module.css";

const text = { theirRepositories: "'s Last 3 Created Repositories" };

// YOU SHOULD NOT NEED TO UPDATE THIS COMPONENT
const UserRepositoriesBase = ({ repositories, textHeader }) => (
  <>
    <h2>{textHeader}</h2>
    <div className={classNames.repositoriesSection}>
      {repositories.map(repository => (
        <Repository key={repository.id} {...repository} />
      ))}
    </div>
  </>
);

const UserRepositories = () => {
  const repositories = [];
  const textHeader = text.theirRepositories;

  const baseProps = { repositories, textHeader };
  return <UserRepositoriesBase {...baseProps} />;
};

export default UserRepositories;
