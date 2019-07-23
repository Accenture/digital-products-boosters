import React from "react";
import { cleanup, render } from "@testing-library/react";
import CommentsSection from "../components/comments-section";
import { text } from "../components/comments-section/utils";

describe("Exercise 1 - CommentsSection component", () => {
  const renderComponent = props => render(<CommentsSection {...props} />);
  let props;

  beforeEach(() => {
    const comments = [
      {
        id: "1",
        text: "first comment",
        user: { firstName: "John", lastName: "PupperLover" }
      },
      {
        id: "2",
        text: "second comment",
        user: { firstName: "Jane", lastName: "DoggoLover" }
      }
    ];
    props = { comments };
  });

  afterEach(cleanup);

  it("should render comments text if there are comments", () => {
    const { getByText } = renderComponent(props);

    expect(getByText(text.comments)).toBeDefined();
  });

  it("should render no comments text if there are no comments", () => {
    const { getByText } = renderComponent({ ...props, comments: [] });

    expect(getByText(text.noComments)).toBeDefined();
  });

  it("should render comments", () => {
    const { getByText } = renderComponent(props);

    props.comments.forEach(comment => {
      expect(getByText(comment.text)).toBeDefined();
    });
  });
});
