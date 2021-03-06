const express = require("express");
const { json } = require("body-parser");
const path = require('path');
const notesRouter = require('./routes/notes');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static("public"));
app.use(json());

//API for notes
app.use('/api/notes', notesRouter);

//get Home page
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);


app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
