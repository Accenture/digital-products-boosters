import React from "react";
import { cleanup, render } from "@testing-library/react";
import App from "../components/app";

xdescribe("Exercise 6 - App component", () => {
  const renderComponent = props => render(<App {...props} />);
  let newsTextText, newsImageTitle, newsVideoTitle, props;

  beforeEach(() => {
    newsTextText = "Doggo rated 20 out of 10!";
    newsImageTitle = "Cutest pupper image!";
    newsVideoTitle = "Cutest pupper video!";
    const newsItems = [
      {
        comments: [],
        id: "1",
        text: newsTextText,
        typename: "NewsText"
      },
      {
        comments: [],
        id: "2",
        imageUrl: "https://placehold.it/",
        title: newsImageTitle,
        typename: "NewsImage"
      },
      {
        comments: [],
        id: "3",
        title: newsVideoTitle,
        typename: "NewsVideo",
        videoUrl: "https://www.youtube.com/embed/1"
      }
    ];
    props = { newsItems };
  });

  afterEach(cleanup);

  it("should render NewsText", () => {
    const { getByText } = renderComponent(props);

    const element = getByText(newsTextText);
    expect(element).toBeDefined();
  });

  it("should render NewsImage", () => {
    const { getByAltText } = renderComponent(props);

    const element = getByAltText(newsImageTitle);
    expect(element).toBeDefined();
    expect(element).toBeInstanceOf(HTMLImageElement);
  });

  it("should render NewsVideo", () => {
    const { getByTitle } = renderComponent(props);

    const element = getByTitle(newsVideoTitle);
    expect(element).toBeDefined();
    expect(element).toBeInstanceOf(HTMLIFrameElement);
  });
});
