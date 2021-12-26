const router = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
let notes = require('../../db/db');
const path = require('path');

const createNewNote = (body, notesArray) => {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../../db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );
    return note;
};

router.get('/notes', (req, res) => {
    let results = notes;

    res.json(results);
});

router.post('/notes', (req, res) => {
    req.body.id = uuidv4();
    
    const note = createNewNote(req.body, notes);
    res.json(note);
});

module.exports = router;