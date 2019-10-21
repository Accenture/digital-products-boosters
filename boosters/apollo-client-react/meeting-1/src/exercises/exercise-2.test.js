import { MockedProvider } from "@apollo/react-testing";
import {
  cleanup,
  fireEvent,
  render,
  waitForElement
} from "@testing-library/react";
import React from "react";
import Repositories from "../components/repositories";
import { repositoriesMocks, timeout } from "./exercise-utils";

// DESIRED FUNCTIONALITY 👇🏽
// https://digital-products-boosters-apollo-client-react-meeting-1.s3.amazonaws.com/exercise-2.gif

xdescribe("Exercise 2 - Repositories - Starring Functionality", () => {
  const renderComponent = () =>
    render(
      <MockedProvider mocks={repositoriesMocks}>
        <Repositories />
      </MockedProvider>
    );

  afterEach(cleanup);

  it("should have a button that stars and unstars the repository when clicked", async () => {
    const { getByLabelText, getByText } = renderComponent();

    await waitForElement(() => getByText("apprentice-a11y-web-workshop"), {
      timeout
    });
    getByText("Created on: 2019-06-25");
    const button = getByLabelText("Star apprentice-a11y-web-workshop");

    fireEvent.click(button);
    await waitForElement(
      () => getByLabelText("Unstar apprentice-a11y-web-workshop"),
      { timeout }
    );

    fireEvent.click(button);
    await waitForElement(
      () => getByLabelText("Star apprentice-a11y-web-workshop"),
      { timeout }
    );
  });
});
