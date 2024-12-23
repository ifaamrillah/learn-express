const { createServer } = require("node:http");

const server = createServer();

const htmlHomepage = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <body>
        <h1>Homepage</h1>
      </body>
    </html>
    `;

const htmlAbout = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <body>
        <h1>About</h1>
      </body>
    </html>
    `;

const htmlNotFound = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <body>
        <h1>404 - Not Found</h1>
      </body>
    </html>
    `;

server.on("request", (req, res) => {
  const { method, url, headers } = req;

  console.debug("request recieved :", {
    method,
    url,
    headers: { "content-type": headers["content-type"] },
  });

  switch (url) {
    case "/home":
      res.writeHead(200, {
        "Content-Type": "text/html",
        "content-length": htmlHomepage.length,
      });
      res.end(htmlHomepage);
      return;
    case "/about":
      res.writeHead(200, {
        "Content-Type": "text/html",
        "content-length": htmlAbout.length,
      });
      res.end(htmlAbout);
      return;
    default:
      res.writeHead(404, {
        "Content-Type": "text/html",
        "content-length": htmlNotFound.length,
      });
      res.end(htmlNotFound);
      return;
  }
});

server.on("connection", (socket) => {
  const remoteAddress = socket.remoteAddress;
  const remotePort = socket.remotePort;
  console.log(`New connection from ${remoteAddress} using port ${remotePort}`);
});

const port = 8000;
server.listen(port, "localhost", () => {
  console.log(`Server listening on port ${port}`);
});
