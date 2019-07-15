const childProcess = require("child_process");
const fs = require("fs");
const util = require("util");
const boostersDir = "boosters";

const exec = util.promisify(childProcess.exec);
const readdir = util.promisify(fs.readdir);

const determineMeetingRelativePaths = async booster => {
  const meetingFolders = (await readdir(`${boostersDir}/${booster}`)).filter(
    value => value[0] !== "." && value.startsWith("meeting")
  );

  return meetingFolders.map(meetingFolder => `${booster}/${meetingFolder}`);
};

const determineBoosterMeetingRelativePaths = async boosters => {
  const nestedBoosterMeetingRelativePath = await Promise.all(
    boosters.map(booster => determineMeetingRelativePaths(booster))
  );
  return nestedBoosterMeetingRelativePath.reduce(
    (paths, currentPaths) => [...paths, ...currentPaths],
    []
  );
};

const buildSlides = async () => {
  console.log("building booster slides");
  const boosters = fs
    .readdirSync(boostersDir)
    .filter(value => value[0] !== ".");

  const boosterMeetingRelativePaths = await determineBoosterMeetingRelativePaths(
    boosters
  );

  await boosterMeetingRelativePaths.reduce(
    async (previousPromise, boosterMeetingRelativePath) => {
      await previousPromise;
      const basepath = `/digital-products-boosters/slides/${boosterMeetingRelativePath}`;
      const outDir = `build/slides/${boosterMeetingRelativePath}`;
      const deckPath = `boosters/${boosterMeetingRelativePath}/deck.mdx`;
      const command = `yarn mdx-deck --basepath=${basepath} --out-dir ${outDir} build ${deckPath}`;
      console.log(`building slides: ${boosterMeetingRelativePath}`);
      return exec(command);
    },
    Promise.resolve()
  );
};

buildSlides();
