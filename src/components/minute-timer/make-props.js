const SECONDS_PER_MINUTE = 60;

export const makeInitialSeconds = ({ minutes }) => minutes * SECONDS_PER_MINUTE;

export const makeIsTimeRemaining = ({ secondsLeft }) => secondsLeft > 0;

export const makeMinutesLeftShown = ({ secondsLeft }) =>
  Math.floor(secondsLeft / SECONDS_PER_MINUTE);

export const makeSecondsLeftShown = ({ secondsLeft }) =>
  secondsLeft % SECONDS_PER_MINUTE;

export const makeTimeLeftShown = ({ minutesLeftShown, secondsLeftShown }) => {
  const areMinutesLeft = minutesLeftShown !== 0;
  return `${areMinutesLeft ? minutesLeftShown : ""}${
    areMinutesLeft ? ":" : ""
  }${secondsLeftShown === 0 ? "00" : secondsLeftShown}${
    areMinutesLeft ? "" : " seconds"
  }`;
};

export const makeStyle = ({ isTimeRemaining }) =>
  isTimeRemaining ? { fontStyle: "italic" } : { color: "red" };

export const makeTextTimer = ({
  isDiscussion,
  isTimeRemaining,
  timeLeftShown
}) =>
  isTimeRemaining
    ? `${timeLeftShown} left in ${isDiscussion ? "discussion" : "exercise"}`
    : "time is up, please move on to answer";
