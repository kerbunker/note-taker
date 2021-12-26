const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const notes = require('../../db/db');
const { createNewNote, validateNote, deleteNote } = require('../../lib/notes');


router.get('/notes', (req, res) => {
    let results = notes;

    res.json(results);
});

router.post('/notes', (req, res) => {
    req.body.id = uuidv4();

    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
    
    
});

router.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    if (!deleteNote(id, notes)) {
        res.status(400).send('Requested note to delete not found.');
    } else {
        res.json(notes);
    }
    
})

module.exports = router;