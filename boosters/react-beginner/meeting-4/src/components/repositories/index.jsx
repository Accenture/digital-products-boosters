import React from "react";
import classNames from "./class-names.module.css";

export const repositoryNames = ["react", "react-native", "create-react-app"];

export const text = {
  loading: "Loading Repository",
  pick: "Pick A Repository",
  repositories: "Repositories"
};

// YOU SHOULD NOT NEED TO UPDATE THIS COMPONENT
const Loading = () => <div>{text.loading}</div>;

// YOU SHOULD NOT NEED TO UPDATE THIS COMPONENT
const RepositoryBase = ({
  description,
  full_name,
  html_url,
  stargazers_count
}) => (
  <div className={classNames.repository}>
    <h1>
      <a href={html_url}>{full_name}</a>
    </h1>
    <div>Stargazers: {stargazers_count}</div>
    <p>{description}</p>
  </div>
);

const RepositoryLink = ({ repositoryName }) => {
  const href = `/repositories/${repositoryName}`;

  return (
    <li>
      <a href={href}>{repositoryName}</a>
    </li>
  );
};

const Repository = () => {
  let repository;

  return repository ? <RepositoryBase {...repository} /> : <Loading />;
};

const Repositories = () => (
  <div className={classNames.repositoryPicker}>
    <h1>
      <a href="/">{text.repositories}</a>
    </h1>
    <ul>
      {repositoryNames.map(repositoryName => (
        <RepositoryLink key={repositoryName} repositoryName={repositoryName} />
      ))}
    </ul>
    <Repository />
    <h2>{text.pick}</h2>
  </div>
);

export default Repositories;
