import React from "react";
import { cleanup, render } from "@testing-library/react";
import NewsItem from "../components/news-item";

describe("Exercise 5 - NewsItem component", () => {
  const renderComponent = props => render(<NewsItem {...props} />);

  afterEach(cleanup);

  it("should render NewsText", () => {
    const props = {
      comments: [],
      text: "Doggo rated 20 out of 10!",
      typename: "NewsText"
    };
    const { getByText } = renderComponent(props);

    const element = getByText(props.text);
    expect(element).toBeDefined();
  });

  it("should render NewsImage", () => {
    const props = {
      comments: [],
      imageUrl: "https://placehold.it/",
      title: "Cutest pupper image!",
      typename: "NewsImage"
    };
    const { getByAltText } = renderComponent(props);

    const element = getByAltText(props.title);
    expect(element).toBeDefined();
    expect(element).toBeInstanceOf(HTMLImageElement);
  });

  it("should render NewsVideo", () => {
    const props = {
      comments: [],
      videoUrl: "https://www.youtube.com/embed/1",
      title: "Cutest pupper video!",
      typename: "NewsVideo"
    };
    const { getByTitle } = renderComponent(props);

    const element = getByTitle(props.title);
    expect(element).toBeDefined();
    expect(element).toBeInstanceOf(HTMLIFrameElement);
  });
});
