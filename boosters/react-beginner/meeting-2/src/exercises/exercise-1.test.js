import React from "react";
import { fireEvent, cleanup, render } from "@testing-library/react";
import Accordion from "../components/accordion";

// Example https://digital-products-boosters-react-beginner-meeting-2.s3.amazonaws.com/exercise-1.gif
xdescribe("Exercise 1 - Accordion component", () => {
  const renderComponent = props => render(<Accordion {...props} />);
  let props;

  beforeEach(() => {
    const tabData = [
      { title: "About", content: "We are awesome!" },
      { title: "Visit", content: "Come visit us!" },
      { title: "Tuition", content: "We are expensive!" }
    ];
    props = { tabData };
  });

  afterEach(cleanup);

  it("should render the tab titles", () => {
    const { queryByText } = renderComponent(props);

    props.tabData.forEach(({ title }) => {
      expect(queryByText(title)).toBeTruthy();
    });
  });

  it("should not render the content initially", () => {
    const { queryByText } = renderComponent(props);

    props.tabData.forEach(({ content }) => {
      expect(queryByText(content)).toBeNull();
    });
  });

  it("should show the content for a tab after clicking on it", () => {
    const { getByText, queryByText } = renderComponent(props);
    const [firstTabDatum, ...remainingTabDatum] = props.tabData;
    const tabButton = getByText(firstTabDatum.title);

    fireEvent.click(tabButton);

    expect(queryByText(firstTabDatum.content)).toBeTruthy();

    remainingTabDatum.forEach(({ content }) => {
      expect(queryByText(content)).toBeFalsy();
    });
  });

  it("should hide the content for an open tab after clicking on it", () => {
    const { getByText, queryByText } = renderComponent(props);
    const [firstTabDatum] = props.tabData;
    const tabButton = getByText(firstTabDatum.title);

    fireEvent.click(tabButton);
    fireEvent.click(tabButton);

    props.tabData.forEach(({ content }) => {
      expect(queryByText(content)).toBeNull();
    });
  });

  it("should hide the content for an open tab after clicking on a different tab", () => {
    const { getByText, queryByText } = renderComponent(props);
    const [firstTabDatum, secondTabDatum, thirdTabDatum] = props.tabData;

    const firstTabButton = getByText(firstTabDatum.title);
    fireEvent.click(firstTabButton);

    const secondTabButton = getByText(secondTabDatum.title);
    fireEvent.click(secondTabButton);

    expect(queryByText(secondTabDatum.content)).toBeTruthy();
    expect(queryByText(firstTabDatum.content)).toBeNull();
    expect(queryByText(thirdTabDatum.content)).toBeNull();
  });
});
