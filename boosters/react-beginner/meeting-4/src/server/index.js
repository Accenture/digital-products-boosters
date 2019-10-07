#!/usr/bin/env node

"use strict";

const data = require("./data.json");
const http = require("http");

const PORT = 8080;
const CORS_HEADERS = {
  "access-control-allow-methods": "GET, POST, PATCH, OPTIONS, DELETE",
  "access-control-allow-origin": "*"
};
const CORS_JSON_HEADERS = {
  ...CORS_HEADERS,
  "content-type": "application/json"
};
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
const TAKEN_USERNAME = "john";
const TIMEOUT_MS = 300;

const requestHandler = async (request, response) => {
  const methodUrl = `${request.method} ${request.url}`;
  console.log(methodUrl);

  if (request.method === "GET" && request.url.startsWith("/username/")) {
    const [, , username] = request.url.split("/");
    const statusCode = username === TAKEN_USERNAME ? 200 : 404;

    response.writeHead(statusCode, CORS_HEADERS);
    response.end();
    return;
  }

  if (request.method === "GET" && request.url.startsWith("/repos/")) {
    const [, , repositoryName] = request.url.split("/");
    const repository = data[repositoryName];

    if (!repository) {
      const body = JSON.stringify({ message: "Not Found" });
      response.writeHead(404, CORS_JSON_HEADERS);
      response.end(body);
      return;
    }

    const body = JSON.stringify(repository);

    await wait(TIMEOUT_MS);

    response.writeHead(200, CORS_JSON_HEADERS);
    response.end(body);

    return;
  }

  response.statusCode = 404;
  response.end();
};

const server = http.createServer(requestHandler);

server.listen(PORT, () =>
  console.log(`Listening on http://localhost:${PORT}\n`)
);
