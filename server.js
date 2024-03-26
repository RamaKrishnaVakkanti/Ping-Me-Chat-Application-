const express = require("express");
const app = express();
const path = require("path");
const compress = require("compression");
const helmet = require("helmet");
app.use(
  helmet.frameguard({
    action: "sameorigin",
  })
);
app.use(compress());
app.use(express.static(path.join(__dirname, "./build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/build/index.html"));
});
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3001;
app.listen(DEFAULT_PORT);
console.log(`Listening on port ${DEFAULT_PORT}`);