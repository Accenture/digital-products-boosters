import {
  cleanup,
  fireEvent,
  render,
  waitForElement
} from "@testing-library/react";
import React from "react";
import ProgressBars, { text } from "../components/progress-bars";
import { testTimeout, queryPercentProgressBar } from "./exercise-utils";

// DESIRED FUNCTIONALITY 👇🏽
// https://digital-products-boosters-react-beginner-meeting-3.s3.amazonaws.com/exercise-1.gif

xdescribe("Exercise 1 - ProgressBars component", () => {
  const renderComponent = () => render(<ProgressBars />);

  afterEach(cleanup);

  it("should render a 50% progress bar initially", async () => {
    const { container } = renderComponent();

    expect(queryPercentProgressBar.percent0(container)()).not.toBeNull();
    await waitForElement(queryPercentProgressBar.percent50(container), {
      timeout: testTimeout
    });
  });

  it("should render a progress bar according to the number field", async () => {
    const { container, getByDisplayValue } = renderComponent();

    await waitForElement(queryPercentProgressBar.percent50(container), {
      timeout: testTimeout
    });
    const numberField = getByDisplayValue("50");
    fireEvent.change(numberField, { target: { value: "75" } });

    await waitForElement(queryPercentProgressBar.percent75(container), {
      timeout: testTimeout
    });
  });

  it("should render multiple working progress bars", async () => {
    const { container, getByDisplayValue, getByText } = renderComponent();

    await waitForElement(queryPercentProgressBar.percent50(container), {
      timeout: testTimeout
    });
    const numberField1 = getByDisplayValue("50");
    fireEvent.change(numberField1, { target: { value: "75" } });

    const addButton = getByText(text.add);
    fireEvent.click(addButton);
    const numberField2 = getByDisplayValue("50");
    fireEvent.change(numberField2, { target: { value: "100" } });

    await waitForElement(queryPercentProgressBar.percent75(container), {
      timeout: testTimeout
    });
    await waitForElement(queryPercentProgressBar.percent100(container), {
      timeout: testTimeout
    });
  });
});
