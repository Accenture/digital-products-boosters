import { MockedProvider } from "@apollo/react-testing";
import { cleanup, render, waitForElement } from "@testing-library/react";
import React from "react";
import Repositories from "../components/repositories";
import { repositoriesMocks, timeout } from "./exercise-utils";

// DESIRED FUNCTIONALITY 👇🏽
// https://digital-products-boosters-apollo-client-react-meeting-1.s3.amazonaws.com/exercise-1.gif

describe("Exercise 1 - Repositories", () => {
  const renderComponent = () =>
    render(
      <MockedProvider mocks={repositoriesMocks}>
        <Repositories />
      </MockedProvider>
    );

  afterEach(cleanup);

  it("should show the names, created dates, and starred status of the viewer's repositories", async () => {
    const { getByLabelText, getByText } = renderComponent();

    await waitForElement(() => getByText("apprentice-a11y-web-workshop"), {
      timeout
    });
    getByText("Created on: 2019-06-25");
    getByLabelText("Star apprentice-a11y-web-workshop");

    getByText("elasticsearch-rails");
    getByText("Created on: 2019-05-02");
    getByLabelText("Unstar elasticsearch-rails");

    getByText("apollo-client");
    getByText("Created on: 2019-03-16");
    getByLabelText("Unstar apollo-client");
  });
});
