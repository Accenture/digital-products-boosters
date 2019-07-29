import React from "react";
import classNames from "./class-names.module.css";

const AccordionTabBase = ({ content, title }) => (
  <li className={classNames.rootTab}>
    <button>{title}</button>
    <div>{content}</div>
  </li>
);

const AccordionTab = props => {
  const baseProps = { ...props };
  return <AccordionTabBase {...baseProps} />;
};

const AccordionBase = ({ tabData }) => (
  <ul className={classNames.root}>
    {tabData.map(tabDatum => (
      <AccordionTab key={tabDatum.title} {...tabDatum} />
    ))}
  </ul>
);

const Accordion = props => {
  const baseProps = { ...props };
  return <AccordionBase {...baseProps} />;
};

export default Accordion;
