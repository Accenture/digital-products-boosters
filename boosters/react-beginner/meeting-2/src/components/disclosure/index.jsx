import React from "react";
import classNames from "./class-names.module.css";

const DisclosureBase = ({ links, name }) => (
  <div className={classNames.root}>
    <button className={classNames.button}>{name}</button>
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
  </div>
);

const Disclosure = props => {
  const baseProps = { ...props };
  return <DisclosureBase {...baseProps} />;
};

export default Disclosure;
