import { gql } from "apollo-boost";
import React from "react";

export const QUERY_GET_CURRENT_USER_LOGIN = gql`
  {
    viewer {
      id
      login
    }
  }
`;

// YOU SHOULD NOT NEED TO UPDATE THIS COMPONENT
const GreetingBase = ({ message }) => <h1>{message}</h1>;

const Greeting = () => {
  const message = "Hello";

  const baseProps = { message };
  return <GreetingBase {...baseProps} />;
};

export default Greeting;
