import React, { useEffect, useState } from "react";
import classNames from "./class-names.module.css";
import { checkIfUsernameExists } from "./utils";

export const DEBOUNCED_TIME_MS = 500;

export const text = {
  username: "Username",
  usernameAvailable: "Username is available!",
  usernameTaken: "Username has already been taken!"
};

const usernameStatuses = {
  AVAILABLE: "AVAILABLE",
  TAKEN: "TAKEN",
  UNKNOWN: "UNKNOWN"
};

const useDebouncedEffect = () => {};

// YOU SHOULD NOT NEED TO UPDATE THIS COMPONENT
const UsernameFieldBase = ({
  isUsernameAvailable,
  isUsernameTaken,
  onChange,
  value
}) => (
  <div className={classNames.root}>
    <label htmlFor="username">{text.username}</label>
    <input id="username" onChange={onChange} value={value} />
    {isUsernameAvailable && (
      <span className={classNames.available}>{text.usernameAvailable}</span>
    )}
    {isUsernameTaken && (
      <span className={classNames.taken}>{text.usernameTaken}</span>
    )}
  </div>
);

// YOU SHOULD NOT NEED TO UPDATE THIS COMPONENT
const UsernameField = () => {
  const [username, setUsername] = useState("");
  const [usernameStatus, setUsernameStatus] = useState(
    usernameStatuses.UNKNOWN
  );
  const onChange = event => setUsername(event.target.value);

  useEffect(() => {
    setUsernameStatus(usernameStatuses.UNKNOWN);
  }, [username]);

  useDebouncedEffect(() => {
    if (username !== "") {
      checkIfUsernameExists(username).then(isTaken => {
        const status = isTaken
          ? usernameStatuses.TAKEN
          : usernameStatuses.AVAILABLE;

        setUsernameStatus(status);
      });
    }
  }, DEBOUNCED_TIME_MS);

  const baseProps = {
    isUsernameAvailable: usernameStatus === usernameStatuses.AVAILABLE,
    isUsernameTaken: usernameStatus === usernameStatuses.TAKEN,
    onChange,
    value: username
  };
  return <UsernameFieldBase {...baseProps} />;
};

export default UsernameField;
