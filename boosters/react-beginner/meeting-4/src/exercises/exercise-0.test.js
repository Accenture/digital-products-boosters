import { cleanup, fireEvent, render } from "@testing-library/react";
import React from "react";
import Coin, { text } from "../components/coin";

// DESIRED FUNCTIONALITY 👇🏽
// https://digital-products-boosters-react-beginner-meeting-4.s3.amazonaws.com/exercise-0.gif

describe("Exercise 0 - Coin component", () => {
  const renderComponent = props => render(<Coin {...props} />);

  afterEach(cleanup);

  it("should initially set the coin to heads if isInitiallyHeads is not specified", async () => {
    const { getByAltText } = renderComponent();

    getByAltText(text.heads);
  });

  it("should initially set the coin to heads if isInitiallyHeads is true", async () => {
    const { getByAltText } = renderComponent({ isInitiallyHeads: true });

    getByAltText(text.heads);
  });

  it("should initially set the coin to tails if isInitiallyHeads is false", async () => {
    const { getByAltText } = renderComponent({ isInitiallyHeads: false });

    getByAltText(text.tails);
  });

  it("should set the coin to heads when clicking the change to heads button", async () => {
    const { getByAltText, getByText } = renderComponent({
      isInitiallyHeads: false
    });

    const button = getByText(text.buttonHeads);

    getByAltText(text.tails);
    fireEvent.click(button);
    getByAltText(text.heads);
    fireEvent.click(button);
    getByAltText(text.heads);
  });

  it("should set the coin to tails when clicking the change to tails button", async () => {
    const { getByAltText, getByText } = renderComponent({
      isInitiallyHeads: true
    });

    const button = getByText(text.buttonTails);

    getByAltText(text.heads);
    fireEvent.click(button);
    getByAltText(text.tails);
    fireEvent.click(button);
    getByAltText(text.tails);
  });

  it("should flip the coin when clicking the flip coin button", async () => {
    const { getByAltText, getByText } = renderComponent({
      isInitiallyHeads: true
    });

    const button = getByText(text.buttonFlip);

    getByAltText(text.heads);
    fireEvent.click(button);
    getByAltText(text.tails);
    fireEvent.click(button);
    getByAltText(text.heads);
  });
});
