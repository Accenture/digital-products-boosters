import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React from "react";
import Error from "../error";
import Loading from "../loading";

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
  const { loading, error, data } = useQuery(QUERY_GET_CURRENT_USER_LOGIN);
  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  const message = `Hello ${data.viewer.login}`;

  const baseProps = { message };
  return <GreetingBase {...baseProps} />;
};

export default Greeting;
