const USE_LOCAL_BACK_END = true;
const BASE_URL = USE_LOCAL_BACK_END
  ? "http://localhost:8080/repos/"
  : "https://api.github.com/repos/facebook/";

export const fetchRepository = async repositoryName => {
  const url = BASE_URL + repositoryName;
  const response = await fetch(url).then(
    response => response,
    () => alert("Please run server locally")
  );
  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};
