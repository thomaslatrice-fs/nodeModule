const http = require("http");
require("dotenv").config();

const app = require("./app/routes");

const server = http.createServer(app);
const PORT = 3000;

server.listen(process.env.PORT, () => {
  console.log(`listening on ${process.env.PORT}`);
});
