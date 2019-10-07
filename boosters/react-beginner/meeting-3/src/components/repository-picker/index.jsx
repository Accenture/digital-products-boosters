import React, { useEffect, useState } from "react";
import classNames from "./class-names.module.css";
import { fetchRepository } from "./utils";

// You should not have to update this component
const Repository = ({ description, full_name, html_url, stargazers_count }) => (
  <div className={classNames.repository}>
    <h1>
      <a href={html_url}>{full_name}</a>
    </h1>
    <div>Stargazers: {stargazers_count}</div>
    <p>{description}</p>
  </div>
);

export const repositoryNames = ["react", "react-native", "create-react-app"];

export const text = { repository: "Select Repository" };

// You should not have to update this component
const RepositoryPickerBase = ({
  onChange,
  repository,
  selectedRepositoryName
}) => (
  <div className={classNames.repositoryPicker}>
    <label htmlFor="repositoryName">{text.repository}</label>
    <select
      id="repositoryName"
      name="repositoryName"
      onChange={onChange}
      value={selectedRepositoryName}
    >
      {repositoryNames.map(repositoryName => (
        <option key={repositoryName} value={repositoryName}>
          {repositoryName}
        </option>
      ))}
    </select>
    {repository && <Repository {...repository} />}
  </div>
);

const RepositoryPicker = () => {
  const [selectedRepositoryName, setSelectedRepositoryName] = useState(
    repositoryNames[0]
  );
  const onChange = event => setSelectedRepositoryName(event.target.value);
  const [repository, setRepository] = useState();

  useEffect(() => {
    async function fetchAndSetRepository() {
      const responseBody = await fetchRepository(selectedRepositoryName);
      setRepository(responseBody);
    }

    fetchAndSetRepository();
  }, [selectedRepositoryName]);

  const baseProps = {
    onChange,
    repository,
    selectedRepositoryName
  };

  return <RepositoryPickerBase {...baseProps} />;
};

export default RepositoryPicker;
