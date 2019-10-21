import { MockedProvider } from "@apollo/react-testing";
import { cleanup, render, waitForElement } from "@testing-library/react";
import React from "react";
import Greeting from "../components/greeting";
import { text } from "../components/loading";
import { greetingMocks, timeout } from "./exercise-utils";

// DESIRED FUNCTIONALITY 👇🏽
// https://digital-products-boosters-apollo-client-react-meeting-1.s3.amazonaws.com/exercise-0.gif

describe("Exercise 0 - Greeting", () => {
  const renderComponent = () =>
    render(
      <MockedProvider mocks={greetingMocks}>
        <Greeting />
      </MockedProvider>
    );

  afterEach(cleanup);

  it("should display a greeting with the viewer's login", async () => {
    const { getByText } = renderComponent();

    getByText(text.loading);
    await waitForElement(() => getByText("Hello davidrf"), { timeout });
  });
});
