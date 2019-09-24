import React, { useState } from "react";
import classNames from "./class-names.module.css";

const DisclosureBase = ({ isOpen, links, name, toggle }) => (
  <div className={classNames.root}>
    <button className={classNames.button} onClick={toggle}>
      {name}
    </button>
    {isOpen && (
      <div className={classNames.content}>
        <ul className={classNames.list}>
          {links.map(({ href, text }) => (
            <li className={classNames.listItem} key={text}>
              <a className={classNames.link} href={href}>
                {text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

const Disclosure = props => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(previousState => !previousState);

  const baseProps = { ...props, isOpen, toggle };
  return <DisclosureBase {...baseProps} />;
};

export default Disclosure;
