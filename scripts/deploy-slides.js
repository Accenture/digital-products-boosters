const childProcess = require("child_process");
const util = require("util");
const getBoosterMeetingInfo = require("./get-booster-meeting-info");
const createQuestion = require("./create-question");
const exec = util.promisify(childProcess.exec);

const question = createQuestion("build");
const buildSlides = async () => {
  const boosterMeetingInfo = await getBoosterMeetingInfo(question);
  if (!boosterMeetingInfo) return;

  const buildCommand = `yarn build-slides ${boosterMeetingInfo.deckPath}`;
  console.log(`\nbuilding slides...`);
  console.log(`$ ${buildCommand}`);
  await exec(buildCommand);

  const bucketSuffix = boosterMeetingInfo.name.replace("/", "-");
  const s3Bucket = `s3://digital-products-boosters-${bucketSuffix}`;
  const uploadCommand = `yarn upload-slides ${s3Bucket}`;
  console.log(`\nuploading slides..`);
  console.log(`$ ${uploadCommand}`);
  await exec(uploadCommand);
  console.log("\nSlides successfully deployed!");
};

buildSlides();
