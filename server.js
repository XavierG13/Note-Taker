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
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

//Variable
//======================================

let notesArray = [];
//creates a save point for the past notes that have been created and pushed them to the noteArray

var notesSaved = fs.readFileSync("db/db.json", "UTF-8");
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
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// Will default to home when not matching route is find

//API GET requests
//======================================

app.get("/api/notes", function (req, res) {
  console.log(notesArray);
  return res.json(notesArray);
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});
// POST requests

// Takes in JSON notes input which will then saveNote to notesArray which is the db.json will then write the file to the db.json, adds id to each note created
app.post("/api/notes", function (req, res) {
  let saveNote = req.body;
  notesArray.push(saveNote);
  res.json(saveNote);
  newID();

  fs.writeFileSync(
    "db/db.json",
    JSON.stringify(notesArray, null, 2),
    function (err) {
      if (err) throw err;
    }
  );
  return console.log("Adding new note: " + saveNote.title);
});

//will delete notes from the notesArray
//Functions
//========================================
app.delete("/api/notes/:id", function (req, res) {
  console.log(req.params.id);
  let deleteNote = req.params.id;
  notesArray.splice(deleteNote, 1);
  newID();

  fs.writeFileSync(
    "db/db.json",
    JSON.stringify(notesArray),
    function (err) {
      if (err) throw err;
    }
  );
});

//this function will create an id for each note that is saved
function newID() {
  for (var i = 0; i < notesArray.length; i++) {
    notesArray[i].id = i;
  }
}

//Begins listening to the server

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
