import { DEBOUNCED_TIME_MS } from "../components/username-field";
import data from "../server/data.json";

export const timeoutExercise1 = DEBOUNCED_TIME_MS + 100;
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

export const fetchImplementationExercise1 = async url => {
  await wait(10);

  return {
    ok: url.endsWith("john")
  };
};

const fetchTimeoutExercise2 = 100;
export const timeoutExercise2 = fetchTimeoutExercise2 + 100;
export const fetchImplementationExercise2 = async url => {
  const repositoryName = url.split("/")[4];
  const repository = data[repositoryName];
  const ok = Boolean(repository);
  const json = async () => (repository ? repository : { message: "Not Found" });

  await wait(fetchTimeoutExercise2);

  return {
    ok,
    json
  };
};
