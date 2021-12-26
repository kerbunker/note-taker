// imports data
const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const notes = require('../../db/db');
const { createNewNote, validateNote, deleteNote } = require('../../lib/notes');

// gets the data from the notes array from db/db.json and sends the data
router.get('/notes', (req, res) => {
    let results = notes;

    res.json(results);
});

// Allows a new note to be created an displayed on the page
router.post('/notes', (req, res) => {
    // gets a new unique id for the note
    req.body.id = uuidv4();
    // checks that the note is properly formated
    if (!validateNote(req.body)) {
        // displays an error message if not formatted correctly
        res.status(400).send('The note is not properly formatted.');
    } else {
        // creates a new note and displays it to the page
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});

// Route to delete a note from the page
router.delete('/notes/:id', (req, res) => {
    // gets the id from the params given
    const id = req.params.id;
    // tries to delete the note with the given id
    if (!deleteNote(id, notes)) {
        // sends an error code if a note with the given id is not found
        res.status(400).send('Requested note to delete not found.');
    } else {
        // sends the updated note list to be displayed on the page
        res.json(notes);
    }
    
});

// exports the data for use with other files
module.exports = router;