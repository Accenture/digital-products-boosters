import React, { useEffect, useRef, useState } from "react";
import classNames from "./class-names.module.css";
import { drawProgressBar, makePercentage } from "./utils";

export const text = {
  add: "Add Progress Bar"
};

const ProgressBarBase = ({ onChange, svgElement, textLabel, value }) => (
  <div>
    <div className={classNames.formElements}>
      <label>{textLabel}</label>
      <input
        max="100"
        min="0"
        onChange={onChange}
        type="number"
        value={value}
      />
    </div>
    <svg className={classNames.svg} ref={svgElement} />
  </div>
);

const ProgressBar = ({ progressBarId }) => {
  const [value, setValue] = useState("50");
  const onChange = event => setValue(event.target.value);
  const percentage = makePercentage(value);
  const textLabel = `Progress Bar #${progressBarId} %:`;
  const svgElement = useRef();

  useEffect(() => {
    drawProgressBar(svgElement.current, percentage);
  }, [percentage]);

  const baseProps = {
    onChange,
    svgElement,
    textLabel,
    value
  };
  return <ProgressBarBase {...baseProps} />;
};

// You should not have to update this component
const ProgressBarsBase = ({ progressBarIds, onClick }) => (
  <div className={classNames.root}>
    <button className={classNames.addButton} onClick={onClick}>
      {text.add}
    </button>
    <div className={classNames.progressBars}>
      {progressBarIds.map(progressBarId => (
        <ProgressBar key={progressBarId} progressBarId={progressBarId} />
      ))}
    </div>
  </div>
);

// You should not have to update this component
const ProgressBars = () => {
  const [numberOfProgressBars, setNumberOfProgressBars] = useState(1);
  const onClick = () =>
    setNumberOfProgressBars(previousState => previousState + 1);
  const progressBarIds = Array.from(
    { length: numberOfProgressBars },
    (_, index) => index + 1
  );

  const baseProps = {
    progressBarIds,
    onClick
  };
  return <ProgressBarsBase {...baseProps} />;
};

export default ProgressBars;
