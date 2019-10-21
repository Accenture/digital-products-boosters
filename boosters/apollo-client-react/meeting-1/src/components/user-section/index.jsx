import { gql } from "apollo-boost";
import React, { useState } from "react";
import Repository from "../repository";
import UserRepositories from "../user-repositories";
import classNames from "./class-names.module.css";

export const text = {
  login: "Login",
  submit: "Lookup User"
};

export const QUERY_GET_USER_REPOSITORIES = gql`
  query QUERY_VIEWER_REPOSITORIES($login: String!) {
    user(login: $login) {
      id
      login
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
const UserSectionBase = ({ children, onChange, onSubmit, value }) => (
  <div>
    <form className={classNames.form} onSubmit={onSubmit}>
      <label htmlFor="login">{text.login}</label>
      <input id="login" onChange={onChange} value={value} />
      <button>{text.submit}</button>
    </form>
    {children}
  </div>
);

const UserSection = () => {
  const [value, setValue] = useState("");
  const onChange = event => setValue(event.target.value);
  const onSubmit = event => {
    event.preventDefault();
  };

  const baseProps = {
    children: <UserRepositories />,
    onChange,
    onSubmit,
    value
  };
  return <UserSectionBase {...baseProps} />;
};

export default UserSection;
