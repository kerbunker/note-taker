// Imports data
const fs = require('fs');
const path = require('path');

// calidates note data
const validateNote = (note) => {
    //checks that the title is a string or returns false
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    // checks that the text of the note is a string or returns false
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    // returns true if everything formatted correctly
    return true;
};

// Creates a new note to add to the array
const createNewNote = (body, notesArray) => {
    // Gets the data from the post request given
    const note = body;
    // pushes the given note object to the notes array
    notesArray.push(note);
    // writes the notes array to the given file
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );
    // returns the note object
    return note;
};

// Deletes the note
const deleteNote = (id, notesArray) => {
    // checks through the note array for the note with the matching id
    for (let i = 0; i < notesArray.length; i++) {
        if (notesArray[i].id === id) {
            // removes the note when the matching id is found
            notesArray.splice(i, 1);
            // writes the new note array to the given file
            fs.writeFileSync(
                path.join(__dirname, '../db/db.json'),
                JSON.stringify(notesArray, null, 2)
            );
            // returns true if note was found
            return true;
        }
    }
    // returns false if all notes have been checked and no matching id was found
    return false;
};

// exports the functions
module.exports = {
    validateNote,
    createNewNote,
    deleteNote
};