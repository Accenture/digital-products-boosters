import { gql } from "apollo-boost";
import React from "react";
import Repository from "../repository";
import classNames from "./class-names.module.css";

const text = {
  yourLast: "Your Last 3 Created Repositories"
};

export const QUERY_GET_VIEWER_REPOSITORIES = gql`
  query getViewerRepositories {
    viewer {
      id
      repositories(first: 3, orderBy: { field: CREATED_AT, direction: DESC }) {
        nodes {
          ...${Repository.fragmentName}
        }
      }
    }
  }

  ${Repository.fragment}
`;

// YOU SHOULD NOT NEED TO UPDATE THIS COMPONENT
const RepositoriesBase = ({ repositories }) => (
  <div>
    <h2>{text.yourLast}</h2>
    <div className={classNames.repositoriesSection}>
      {repositories.map(repository => (
        <Repository key={repository.id} {...repository} />
      ))}
    </div>
  </div>
);

const Repositories = () => {
  const repositories = [];

  const baseProps = { repositories };
  return <RepositoriesBase {...baseProps} />;
};

export default Repositories;
