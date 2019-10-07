const BASE_URL = "http://localhost:8080/username/";

export const checkIfUsernameExists = async username => {
  const url = BASE_URL + username;
  const response = await fetch(url).then(
    response => response,
    () => alert("Please run server locally")
  );
  return response.ok;
};
