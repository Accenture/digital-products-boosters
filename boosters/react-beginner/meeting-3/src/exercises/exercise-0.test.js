import React from "react";
import data from "../components/repository-picker/data.json";
import {
  fireEvent,
  cleanup,
  render,
  waitForElement
} from "@testing-library/react";
import RepositoryPicker, {
  repositoryNames,
  text
} from "../components/repository-picker";
import { fetchRepository } from "../components/repository-picker/utils.js";

jest.mock("../components/repository-picker/utils", () => ({
  fetchRepository: jest.fn(
    require("../components/repository-picker/recorded-response")
      .recordedResponse
  )
}));

// DESIRED FUNCTIONALITY 👇🏽
// https://digital-products-boosters-react-beginner-meeting-3.s3.amazonaws.com/exercise-0.gif

describe("Exercise 0 - RepositoryPicker component", () => {
  const renderComponent = () => render(<RepositoryPicker />);
  const reactNativeRepositoryName = repositoryNames[1];
  const [reactRepository, reactNativeRepository] = repositoryNames.map(
    repositoryName => data[repositoryName]
  );
  const expectRepositoryData = async (repository, getByText) => {
    await waitForElement(() => getByText(repository.full_name), {
      timeout: 300
    });
    getByText(repository.description);
    getByText(`Stargazers: ${repository.stargazers_count}`);
  };

  afterEach(cleanup);
  afterEach(jest.clearAllMocks);

  it("should initially show the data of the first repository", async () => {
    const { getByText } = renderComponent();

    await expectRepositoryData(reactRepository, getByText);
  });

  it("should show the data of a newly selected repository", async () => {
    const { getByLabelText, getByText } = renderComponent();

    await expectRepositoryData(reactRepository, getByText);

    const repositoryField = getByLabelText(text.repository);
    fireEvent.change(repositoryField, {
      target: { value: reactNativeRepositoryName }
    });
    await expectRepositoryData(reactNativeRepository, getByText);
  });

  it("should not make more API calls than necessary", async () => {
    const { getByText } = renderComponent();

    await expectRepositoryData(reactRepository, getByText);
    expect(fetchRepository).toHaveBeenCalledTimes(1);
  });
});
