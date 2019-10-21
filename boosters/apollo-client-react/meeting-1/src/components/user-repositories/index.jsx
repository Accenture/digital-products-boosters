import React from "react";
import Error from "../error";
import Loading from "../loading";
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

const UserRepositories = ({ data, error, loading }) => {
  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  if (!data) return null;

  const { user } = data;
  const repositories = user.repositories.nodes;
  const textHeader = user.login + text.theirRepositories;

  const baseProps = { repositories, textHeader };
  return <UserRepositoriesBase {...baseProps} />;
};

export default UserRepositories;
