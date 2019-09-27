import React from "react";
import classNames from "./class-names.module.css";
import srcGithub from "../../constants/GitHub-Mark-64px.png";

const text = {
  header1: "DIGITAL PRODUCTS",
  header1End: "BOOSTERS 🚀"
};

const makeBoosterMeetingUrl = boosterMeeting =>
  `http://digital-products-boosters-${boosterMeeting}.s3-website-us-east-1.amazonaws.com`;

const boosterData = [{ name: "React - Beginner", meetings: [1, 2, 3, 4] }];
const boosters = boosterData.map(booster => {
  const meetings = booster.meetings.map(number => ({
    number,
    url: makeBoosterMeetingUrl(`react-beginner-meeting-${number}`),
    name: `Meeting ${number}`
  }));

  return { ...booster, meetings };
});

function App() {
  return (
    <div className={classNames.root}>
      <header className={classNames.headerSection}>
        <h1 className={classNames.header1}>
          <div>{text.header1}</div>
          <div className={classNames.header1End}>{text.header1End}</div>
        </h1>
        <a
          className={classNames.github}
          href="https://github.com/Accenture/digital-products-boosters"
        >
          <img alt="Github Icon" src={srcGithub} />
        </a>
      </header>
      <main className={classNames.main}>
        {boosters.map(booster => (
          <>
            <h2 className={classNames.boosterName}>{booster.name}</h2>
            <ul className={classNames.meetingList}>
              {booster.meetings.map(meeting => (
                <li className={classNames.meetingListItem} key={meeting.number}>
                  <span className={classNames.meetingListIcon}>>_</span>
                  <a className={classNames.meetingLink} href={meeting.url}>
                    {meeting.name}
                  </a>
                </li>
              ))}
            </ul>
          </>
        ))}
      </main>
    </div>
  );
}

export default App;
