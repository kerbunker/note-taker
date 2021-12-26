const fs = require('fs');
const path = require('path');

const validateNote = (note) => {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
}

const createNewNote = (body, notesArray) => {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );
    return note;
};

const deleteNote = (id, notesArray) => {
    console.log(notesArray);
    for (let i = 0; i < notesArray.length; i++) {
        if (notesArray[i].id === id) {
            notesArray.splice(i, 1);
            console.log(notesArray);
            fs.writeFileSync(
                path.join(__dirname, '../db/db.json'),
                JSON.stringify(notesArray, null, 2)
            );
            return true;
        }
    }
    return false;
};

module.exports = {
    validateNote,
    createNewNote,
    deleteNote
};