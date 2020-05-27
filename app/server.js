require('dotenv').config()
const express = require("express");
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.listen(process.env.PORT || 3050, () => {
  console.log(`App server started on : ${process.env.PORT}`);
  console.log(`App environment : ${process.env.NODE_ENV}`);
});