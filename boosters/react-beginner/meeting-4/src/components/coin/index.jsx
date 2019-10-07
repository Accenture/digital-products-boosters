import React from "react";
import srcHeads from "./heads.png";
import srcTails from "./tails.jpg";
import classNames from "./class-names.module.css";

const useBooleanState = () => {
  return [false, () => {}, () => {}, () => {}];
};

export const text = {
  buttonFlip: "Flip Coin",
  buttonHeads: "Change To Heads",
  buttonTails: "Change To Tails",
  heads: "quarter heads",
  tails: "quarter tails"
};

// YOU SHOULD NOT NEED TO UPDATE THIS COMPONENT
const CoinBase = ({ alt, onClickFlip, onClickHeads, onClickTails, src }) => (
  <div className={classNames.root}>
    <img alt={alt} className={classNames.image} src={src} />
    <div className={classNames.buttons}>
      <button onClick={onClickFlip}>{text.buttonFlip}</button>
      <button onClick={onClickHeads}>{text.buttonHeads}</button>
      <button onClick={onClickTails}>{text.buttonTails}</button>
    </div>
  </div>
);

// YOU SHOULD NOT NEED TO UPDATE THIS COMPONENT
const Coin = ({ isInitiallyHeads }) => {
  const [isHeads, onClickFlip, onClickHeads, onClickTails] = useBooleanState(
    isInitiallyHeads
  );

  const alt = isHeads ? text.heads : text.tails;
  const src = isHeads ? srcHeads : srcTails;
  const baseProps = { alt, onClickFlip, onClickHeads, onClickTails, src };
  return <CoinBase {...baseProps} />;
};

export default Coin;
