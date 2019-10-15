import {
  cleanup,
  fireEvent,
  render,
  waitForElement
} from "@testing-library/react";
import React from "react";
import UsernameField, { text } from "../components/username-field";
import {
  fetchImplementationExercise1,
  timeoutExercise1
} from "./exercise-utils";

// DESIRED FUNCTIONALITY 👇🏽
// https://digital-products-boosters-react-beginner-meeting-4.s3.amazonaws.com/exercise-1.gif

describe("Exercise 1 - UsernameField component", () => {
  const renderComponent = () => render(<UsernameField />);

  beforeEach(() => {
    window.fetch = jest.fn(fetchImplementationExercise1);
  });

  afterEach(cleanup);

  it("should not show any warning or success messages initially", async () => {
    const { queryByText } = renderComponent();

    expect(queryByText(text.usernameTaken)).toBeNull();
    expect(queryByText(text.usernameAvailable)).toBeNull();
  });

  it("should show a warning message when a username is already taken", async () => {
    const { getByLabelText, getByText } = renderComponent();

    const usernameField = getByLabelText(text.username);
    fireEvent.change(usernameField, { target: { value: "john" } });
    await waitForElement(() => getByText(text.usernameTaken), {
      timeout: timeoutExercise1
    });
  });

  it("should show a success message when a username is available", async () => {
    const { getByLabelText, getByText } = renderComponent();

    const usernameField = getByLabelText(text.username);
    fireEvent.change(usernameField, { target: { value: "johnnie" } });
    await waitForElement(() => getByText(text.usernameAvailable), {
      timeout: timeoutExercise1
    });
  });

  it("should debounce API calls so they do not immediately occur after every key stroke", async () => {
    const { getByLabelText, getByText } = renderComponent();

    const usernameField = getByLabelText(text.username);
    fireEvent.change(usernameField, { target: { value: "j" } });
    fireEvent.change(usernameField, { target: { value: "jo" } });
    fireEvent.change(usernameField, { target: { value: "joh" } });
    fireEvent.change(usernameField, { target: { value: "john" } });
    fireEvent.change(usernameField, { target: { value: "johnn" } });
    fireEvent.change(usernameField, { target: { value: "johnni" } });
    fireEvent.change(usernameField, { target: { value: "johnnie" } });
    await waitForElement(() => getByText(text.usernameAvailable), {
      timeout: timeoutExercise1
    });
    expect(window.fetch).toHaveBeenCalledTimes(1);
  });
});
