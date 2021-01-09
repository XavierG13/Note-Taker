//Dependencies
//======================================

const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.join());
app.use(express.static(path.join(__dirname, "assets/html")));

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});

let notes = [];

app.get("/notes", function (req, res) {
  res.sendfile(path.join(__dirname, "notes.html"));
});

app.get();
