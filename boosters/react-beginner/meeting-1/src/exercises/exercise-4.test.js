import React from "react";
import { cleanup, render } from "@testing-library/react";
import NewsVideo from "../components/news-video";

describe("Exercise 4 - NewsVideo component", () => {
  const renderComponent = props => render(<NewsVideo {...props} />);
  let commentText, props;

  beforeEach(() => {
    const user = { firstName: "John", lastName: "PupperLover" };
    commentText = "comment";
    const comments = [{ id: "1", text: commentText, user }];
    props = {
      comments,
      videoUrl: "https://www.youtube.com/embed/1",
      title: "Cutest pupper!"
    };
  });

  afterEach(cleanup);

  it("should render iframe", () => {
    const { getByTitle } = renderComponent(props);

    const element = getByTitle(props.title);
    expect(element).toBeDefined();
    expect(element).toBeInstanceOf(HTMLIFrameElement);
    expect(element.src).toBe(props.videoUrl);
  });

  it("should render name of commenter", () => {
    const { getByText } = renderComponent(props);

    expect(getByText(commentText)).toBeDefined();
  });
});
