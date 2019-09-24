import React, { useState } from "react";
import classNames from "./class-names.module.css";

const AccordionTabBase = ({ content, isOpen, onClick, title }) => (
  <li className={classNames.rootTab}>
    <button onClick={onClick}>{title}</button>
    {isOpen && <div>{content}</div>}>
  </li>
);

const AccordionTab = ({
  content,
  onClickTabTitle,
  selectedTabTitle,
  title
}) => {
  const isOpen = selectedTabTitle === title;
  const onClick = () => onClickTabTitle(title);

  const baseProps = {
    content,
    isOpen,
    onClick,
    title
  };
  return <AccordionTabBase {...baseProps} />;
};

const AccordionBase = ({ tabData, onClickTabTitle, selectedTabTitle }) => (
  <ul className={classNames.root}>
    {tabData.map(tabDatum => (
      <AccordionTab
        key={tabDatum.title}
        onClickTabTitle={onClickTabTitle}
        selectedTabTitle={selectedTabTitle}
        {...tabDatum}
      />
    ))}
  </ul>
);

const Accordion = props => {
  const [selectedTabTitle, setSelectedTabTitle] = useState(null);
  const onClickTabTitle = title => {
    const nextValue = selectedTabTitle === title ? null : title;
    setSelectedTabTitle(nextValue);
  };

  const baseProps = {
    ...props,
    onClickTabTitle,
    selectedTabTitle,
    setSelectedTabTitle
  };
  return <AccordionBase {...baseProps} />;
};

export default Accordion;
