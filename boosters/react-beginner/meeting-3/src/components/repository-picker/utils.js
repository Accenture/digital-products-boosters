import { recordedResponse } from "./recorded-response";

const shouldUseRecordedResponse = true;

const errorMessage =
  "API rate limit hit, switch shouldUseRecordedResponse back to true";

export const fetchRepository = async repository => {
  if (shouldUseRecordedResponse) return recordedResponse(repository);

  const url = `https://api.github.com/repos/facebook/${repository}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(errorMessage);

  const responseBody = await response.json();
  return responseBody;
};
