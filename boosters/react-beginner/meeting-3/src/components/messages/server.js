#!/usr/bin/env node

"use strict";

const http = require("http");
const WebSocket = require("ws");
let wss;

const PORT = 8080;
const requestHandler = (request, response) => {
  const methodUrl = `${request.method} ${request.url}`;
  console.log(methodUrl);

  if (methodUrl === "POST /messages") {
    let chunks = [];
    request
      .on("data", chunk => chunks.push(chunk))
      .on("end", () => {
        const body = Buffer.concat(chunks).toString();
        wss.clients.forEach(function each(client) {
          if (client.readyState === WebSocket.OPEN) {
            client.send(
              JSON.stringify({
                text: body,
                timestamp: new Date().toLocaleString()
              })
            );
          }
        });

        response.writeHead(200, {
          "access-control-allow-methods": "GET, POST, PATCH, OPTIONS, DELETE",
          "access-control-allow-origin": "*"
        });
        response.end();
      });

    return;
  }

  const statusCode = methodUrl === "GET /" ? 200 : 404;
  response.statusCode = statusCode;
  response.end();
};

const server = http.createServer(requestHandler);
wss = new WebSocket.Server({ server });
wss.on("connection", () => console.log("client connected!"));

server.listen(PORT, () =>
  console.log(`Listening on http://localhost:${PORT}\n`)
);
