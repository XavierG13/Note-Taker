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
app.use(express.static(path.join(__dirname, "Develop/public")));
app.use(express.json());

// Array to hold notes

let notesArray = [];

// Routes
//======================================

//GET Requests
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "Develop/public/notes.html"));
});

// Will default to home when not matching route is find

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "Develop/public/index.html"));
});

// reads the db.json file and returns the parsed data
app.get("/api/notes", function (err, res) {
  let rawData = fs.readFileSync("Develop/db/db.json");
  let note = JSON.parse(rawData);
  console.log(note);
});

// POST requests
// Takes in JSON notes input which will then save newNotes to the notesArray
// app.post();

//Begins listening to the server

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
