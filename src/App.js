const http = require("http");
const getUsers = require("./modules/users");
const { URLSearchParams } = require("url");

const server = http.createServer((request, response) => {
  const url = new URL(request.url, "http://127.0.0.1");
  const params = new URLSearchParams(url.searchParams);
  const name = params.get("hello");
  const users = params.get("users");

  if (name === "<name>") {
    response.status = 200;
    response.statusMessage = "  OK";
    response.header = "Content-type: text/plain";
    response.write("Hello, .");
    response.end();
  } else if (name === "") {
    response.statusCode = 400;
    response.statusMessage = "Bad request";
    response.header = "Content-type: text/plain";
    response.write("Enter a name");
    response.end();
    return;
  } else if (users === "") {
    response.status = 200;
    response.statusMessage = "OK";
    response.header = "Content-type: application/json";
    response.write(getUsers());
    response.end();
  } else if (url.search === "") {
    response.status = 200;
    response.statusMessage = "  OK";
    response.header = "Content-type: text/plain";
    response.write("Hello, world!");
    response.end();
  } else {
    response.statusCode = 500;
    response.statusMessage = "Internal Server Error";
    response.header = "Content-type: text/plain";
    response.write("  ");
    response.end();
  }
});

server.listen(3003, () => {
  console.log("Сервер запущен по адресу http://127.0.0.1:3003");
});
