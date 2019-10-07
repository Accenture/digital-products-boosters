import data from "./data.json";

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

export const recordedResponse = async repository => {
  await wait(200);
  return { ...data[repository] };
};
