import React from "react";
import { cleanup, render } from "@testing-library/react";
import NewsImage from "../components/news-image";

xdescribe("Exercise 3 - NewsImage component", () => {
  const renderComponent = props => render(<NewsImage {...props} />);
  let commentText, props;

  beforeEach(() => {
    const user = { firstName: "John", lastName: "PupperLover" };
    commentText = "comment";
    const comments = [{ id: "1", text: commentText, user }];
    props = {
      comments,
      imageUrl: "https://placehold.it/",
      title: "Cutest pupper!"
    };
  });

  afterEach(cleanup);

  it("should render image", () => {
    const { getByAltText } = renderComponent(props);

    const element = getByAltText(props.title);
    expect(element).toBeDefined();
    expect(element).toBeInstanceOf(HTMLImageElement);
    expect(element.src).toBe(props.imageUrl);
  });

  it("should render name of commenter", () => {
    const { getByText } = renderComponent(props);

    expect(getByText(commentText)).toBeDefined();
  });
});
