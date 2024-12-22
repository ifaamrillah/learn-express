const { createServer } = require("node:http");

const server = createServer((req, res) => {
  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h1>hello world</h1>
  </body>
</html>
`;
  res.writeHead(200, {
    "Content-Type": "text/html",
    "content-length": html.length,
  });
  res.end(html);
});

const port = 8000;
server.listen(port, "localhost", () => {
  console.log(`Server listening on port ${port}`);
});
