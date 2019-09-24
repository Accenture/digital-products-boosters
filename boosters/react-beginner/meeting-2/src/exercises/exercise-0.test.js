import React from "react";
import { fireEvent, cleanup, render } from "@testing-library/react";
import Disclosure from "../components/disclosure";

// Example https://digital-products-boosters-react-beginner-meeting-2.s3.amazonaws.com/exercise-0.gif
describe("Exercise 0 - Disclosure component", () => {
  const renderComponent = props => render(<Disclosure {...props} />);
  let props;

  beforeEach(() => {
    const links = [
      { href: "/about", text: "About" },
      { href: "/visit", text: "Visit" },
      { href: "/tution", text: "Tuition" }
    ];
    props = { name: "Admissions", links };
  });

  afterEach(cleanup);

  it("should not render links initially", () => {
    const { queryByText } = renderComponent(props);

    props.links.forEach(link => {
      expect(queryByText(link.text)).toBeNull();
    });
  });

  it("should render links after clicking menu", () => {
    const { getByText, queryByText } = renderComponent(props);

    fireEvent.click(getByText(props.name));

    props.links.forEach(link => {
      expect(queryByText(link.text)).toBeDefined();
    });
  });

  it("should not render links after clicking menu twice", () => {
    const { getByText, queryByText } = renderComponent(props);

    fireEvent.click(getByText(props.name));
    fireEvent.click(getByText(props.name));

    props.links.forEach(link => {
      expect(queryByText(link.text)).toBeNull();
    });
  });
});
