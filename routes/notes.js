const router = require('express').Router();
const { getNotes, setNotes } = require('../util/util');

//api for notes
//Read file contents
let noteData = getNotes();

//retrieve all notes data
router.get('/', (req, res) => {
  res.status(200).send(noteData);
});

//retrieve note by ID
router.get('/:id', (req, res) => {
  const noteId = parseInt(req.params.id, 10);
  //validation to handle search by note id and pass status/ response based on match
  if (noteId) {
    const foundNote = noteData.find((n) => n.id === noteId);
    if (foundNote) {
      res.status(200).send(foundNote);
    } else {
      res.status(404).send({});
    }
  } else {
    res.status(400).send('Invalid input');
  }
});

//Save note data by Post method
router.post('/', (req, res) => {
  try {
    console.log(req.body);
    let note = req.body;
    //validation for empty request
    if (Object.keys(note).length) {
      let idArr = noteData.map((n) => n.id);

      if (idArr.length) note['id'] = idArr.sort((a, b) => b - a)[0] + 1;
      else note['id'] = 1;

      noteData.push(note);

      setNotes(noteData);

      res.status(201).send(note);
    } else {
      res.status(400).send('Invalid request');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error. Please check log.');
  }
});

//Delete note data on request
router.delete('/:id', (req, res) => {
  const noteId = parseInt(req.params.id, 10);
  //Validate and delete note from json
  if (noteId) {
    noteData = noteData.filter((n) => n.id !== noteId);
    setNotes(noteData);
    res.status(200).send('Note deleted');
  } else {
    res.status(400).send('Invalid input');
  }
});

module.exports = router;
