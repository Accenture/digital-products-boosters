import { MockedProvider } from "@apollo/react-testing";
import {
  cleanup,
  fireEvent,
  render,
  waitForElement
} from "@testing-library/react";
import React from "react";
import UserSection, { text } from "../components/user-section";
import { timeout, userRepositoriesMocks } from "./exercise-utils";

// DESIRED FUNCTIONALITY 👇🏽
// https://digital-products-boosters-apollo-client-react-meeting-1.s3.amazonaws.com/exercise-3.gif

xdescribe("Exercise 3 - UserSection", () => {
  const renderComponent = () =>
    render(
      <MockedProvider mocks={userRepositoriesMocks}>
        <UserSection />
      </MockedProvider>
    );

  afterEach(cleanup);

  it("should have a form that allows you to look up the last three created repositories of another user", async () => {
    const { getByLabelText, getByText } = renderComponent();

    const loginField = getByLabelText(text.login);
    fireEvent.change(loginField, { target: { value: "peggyrayzis" } });

    const submitButton = getByText(text.submit);
    fireEvent.click(submitButton);

    await waitForElement(() => getByText("graphql-landscape"), { timeout });
    getByText("Created on: 2019-10-17");
    getByLabelText("Star graphql-landscape");

    getByText("the-graphql-dx");
    getByText("Created on: 2019-04-12");
    getByLabelText("Star the-graphql-dx");

    getByText("redux-to-graphql");
    getByText("Created on: 2019-04-04");
    getByLabelText("Star redux-to-graphql");
  });
});
