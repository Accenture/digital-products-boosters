import React from "react";
import {
  act,
  cleanup,
  fireEvent,
  render,
  waitForElement
} from "@testing-library/react";
import Repositories, {
  text,
  repositoryNames
} from "../components/repositories/index.jsx";
import {
  fetchImplementationExercise2,
  timeoutExercise2
} from "./exercise-utils.js";
import data from "../server/data.json";

// DESIRED FUNCTIONALITY 👇🏽
// https://digital-products-boosters-react-beginner-meeting-4.s3.amazonaws.com/exercise-2.gif

xdescribe("Exercise 2 - Repositories component", () => {
  const [reactRepositoryName, reactNativeRepositoryName] = repositoryNames;
  const [reactRepository, reactNativeRepository] = repositoryNames.map(
    repositoryName => data[repositoryName]
  );
  const expectRepositoryData = async (repository, getByText) => {
    await waitForElement(() => getByText(repository.full_name), {
      timeout: timeoutExercise2
    });
    getByText(repository.description);
    getByText(`Stargazers: ${repository.stargazers_count}`);
  };
  const renderComponent = () => render(<Repositories />);

  beforeEach(() => {
    window.fetch = jest.fn(fetchImplementationExercise2);
  });

  afterEach(cleanup);
  afterEach(() => window.history.pushState({}, "", "/"));

  it("should initially show the home page", async () => {
    const { getByText } = renderComponent();

    getByText(text.pick);
  });

  it("should have links to navigate to a repository", async () => {
    const { getByText } = renderComponent();

    const reactRepositoryLink = getByText(reactRepositoryName);
    fireEvent.click(reactRepositoryLink);
    expect(window.location.pathname).toBe("/repositories/react");
    getByText(text.loading);
    await expectRepositoryData(reactRepository, getByText);
  });

  it("should show repository information navigating directly to the repository url", async () => {
    window.history.pushState({}, "", "/repositories/react");
    const { getByText } = renderComponent();

    getByText(text.loading);
    await expectRepositoryData(reactRepository, getByText);
  });

  it("should have links from one repository to another", async () => {
    const { getByText } = renderComponent();

    const reactRepositoryLink = getByText(reactRepositoryName);
    fireEvent.click(reactRepositoryLink);
    expect(window.location.pathname).toBe("/repositories/react");
    getByText(text.loading);
    await expectRepositoryData(reactRepository, getByText);

    const reactNativeRepositoryLink = getByText(reactNativeRepositoryName);
    fireEvent.click(reactNativeRepositoryLink);
    expect(window.location.pathname).toBe("/repositories/react-native");
    getByText(text.loading);
    await expectRepositoryData(reactNativeRepository, getByText);
  });

  it("should have a link to go back to the root path", async () => {
    const { getByText } = renderComponent();

    const reactRepositoryLink = getByText(reactRepositoryName);
    fireEvent.click(reactRepositoryLink);
    expect(window.location.pathname).toBe("/repositories/react");
    getByText(text.loading);
    await expectRepositoryData(reactRepository, getByText);

    const rootLink = getByText(text.repositories);
    fireEvent.click(rootLink);
    getByText(text.pick);
  });
});
