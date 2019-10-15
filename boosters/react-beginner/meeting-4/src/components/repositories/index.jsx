import React, { useEffect, useState } from "react";
import { Link, BrowserRouter, Route, useParams } from "react-router-dom";
import classNames from "./class-names.module.css";
import { fetchRepository } from "./utils";

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
      <Link to={href}>{repositoryName}</Link>
    </li>
  );
};

const Repository = () => {
  const { repositoryName } = useParams();
  const [repository, setRepository] = useState(null);

  useEffect(() => {
    async function fetchAndSetRepository() {
      const responseBody = await fetchRepository(repositoryName);
      setRepository(responseBody);
    }

    fetchAndSetRepository();
    return () => setRepository(null);
  }, [repositoryName]);

  return repository ? <RepositoryBase {...repository} /> : <Loading />;
};

const Repositories = () => (
  <BrowserRouter>
    <div className={classNames.repositoryPicker}>
      <h1>
        <Link to="/">{text.repositories}</Link>
      </h1>
      <ul>
        {repositoryNames.map(repositoryName => (
          <RepositoryLink
            key={repositoryName}
            repositoryName={repositoryName}
          />
        ))}
      </ul>
      <Route path="/repositories/:repositoryName">
        <Repository />
      </Route>
      <Route exact path="/">
        <h2>{text.pick}</h2>
      </Route>
    </div>
  </BrowserRouter>
);

export default Repositories;
