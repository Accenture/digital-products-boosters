import React, { useEffect, useState } from "react";
import {
  makeInitialSeconds,
  makeMinutesLeftShown,
  makeSecondsLeftShown,
  makeTimeLeftShown,
  makeTextTimer,
  makeStyle,
  makeIsTimeRemaining
} from "./make-props";

export const MinuteTimerBase = ({ style, textTimer }) => (
  <div style={style}>{textTimer}</div>
);

export const MinuteTimer = ({ isDiscussion, minutes }) => {
  const initialSeconds = makeInitialSeconds({ minutes });
  const [secondsLeft, updateSecondsLeft] = useState(initialSeconds);
  const isTimeRemaining = makeIsTimeRemaining({ secondsLeft });

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isTimeRemaining) {
        updateSecondsLeft(seconds => seconds - 1);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isTimeRemaining, minutes]);
  const minutesLeftShown = makeMinutesLeftShown({ secondsLeft });
  const secondsLeftShown = makeSecondsLeftShown({ secondsLeft });
  const timeLeftShown = makeTimeLeftShown({
    minutesLeftShown,
    secondsLeftShown
  });

  const baseProps = {
    style: makeStyle({ isTimeRemaining }),
    textTimer: makeTextTimer({ isDiscussion, isTimeRemaining, timeLeftShown })
  };
  return <MinuteTimerBase {...baseProps} />;
};
