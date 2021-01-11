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

var noteData = require("./Develop/db/db.json");

// Routes
//======================================

//GET Requests

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
  res.json(noteData);
});

// POST requests

// Takes in JSON notes input which will then save newNotes noteData which is the db.json
app.post("/api/notes", function (req, res) {
  if (noteData.length) {
    let newNote = req.body;
    console.log(newNote);
    noteData.push(newNote);
  }
});

//Ajax function which uses the URL of our API to GET the data associated with it

//Begins listening to the server

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
