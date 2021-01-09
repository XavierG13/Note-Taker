//Dependencies
//======================================

const express = require("express");
const path = require("path");
const fs = require("fs");

// Sets up and the Express app and fs
// =====================================

const app = express();
const PORT = process.env.PORT || 3000;

//Sets up Express app data parsing

app.use(express.urlencoded({ extended: true }));
app.use(express.join());
// app.use(express.static(path.join(__dirname, "assets/html")));

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});

// Array to hold notes
let notes = [];

// Routes
//======================================

//Sends the user to AJAX page
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "notes.html"));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
