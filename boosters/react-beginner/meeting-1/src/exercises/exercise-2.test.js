import React from "react";
import { cleanup, render } from "@testing-library/react";
import NewsText from "../components/news-text";

xdescribe("Exercise 2 - NewsText component", () => {
  const renderComponent = props => render(<NewsText {...props} />);
  let commentText, props;

  beforeEach(() => {
    const user = { firstName: "John", lastName: "PupperLover" };
    commentText = "comment";
    const comments = [{ id: "1", text: commentText, user }];
    props = { comments, text: "Doggo rated 20 out of 10!" };
  });

  afterEach(cleanup);

  it("should render text prop", () => {
    const { getByText } = renderComponent(props);

    expect(getByText(props.text)).toBeDefined();
  });

  it("should render name of commenter", () => {
    const { getByText } = renderComponent(props);

    expect(getByText(commentText)).toBeDefined();
  });
});
