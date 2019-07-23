import React from "react";
import { cleanup, render } from "@testing-library/react";
import Comment from "../components/comment";

describe("Exercise 0 - Comment component", () => {
  const renderComponent = props => render(<Comment {...props} />);
  let props;

  beforeEach(() => {
    const user = { firstName: "John", lastName: "PupperLover" };
    props = { text: "I love this pupper", user };
  });

  afterEach(cleanup);

  it("should render text prop", () => {
    const { getByText } = renderComponent(props);

    expect(getByText(props.text)).toBeDefined();
  });

  it("should render name of commenter", () => {
    const { getByText } = renderComponent(props);

    expect(getByText("- John PupperLover")).toBeDefined();
  });
});
