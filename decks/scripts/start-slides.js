const childProcess = require("child_process");
const getBoosterMeetingInfo = require("./get-booster-meeting-info");
const createQuestion = require("./create-question");

const question = createQuestion("start");
const startSlides = async () => {
  const boosterMeetingInfo = await getBoosterMeetingInfo(question);
  if (!boosterMeetingInfo) return;

  const server = childProcess.spawn("yarn", [
    "mdx-deck",
    boosterMeetingInfo.deckPath
  ]);

  server.stdout.on("data", data => console.log(data.toString()));
  server.stderr.on("data", data => console.log(data.toString()));
  server.on("close", code =>
    console.log(`child process exited with code ${code}`)
  );
};

startSlides();
