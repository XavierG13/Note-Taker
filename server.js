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
app.use(express.static(path.join(__dirname, "./Develop/public")));
app.use(express.json());

//Variable
//======================================

let notesArray = [];

var notesSaved = fs.readFileSync("./Develop/db/db.json:", "utf8");
if (notesSaved) {
  let pastNotes = JSON.parse(notesSaved);
  notesArray = pastNotes;
} else {
  notesArray;
}

// Routes
//======================================

//GET Requests-

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
});

// Will default to home when not matching route is find

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
});

//API GET requests
//======================================

app.get("api/notes", function (req, res) {
  return res.json(notesArray);
});

// POST requests

// Takes in JSON notes input which will then save newNotes noteData which is the db.json
app.post("/api/notes", function (req, res) {
  let saveNote = req.body;
  notesArray.push(saveNote);
  res.json(saveNote);

  return console.log("Adding new note: " + saveNote.title);
});

//Begins listening to the server

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
