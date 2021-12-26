// Imports the necessary data
const path = require('path');
const router = require('express').Router();

// route for the base page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

// route for the notes page
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/notes.html'));
});

// catch-all route for everything else
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});
// exports data to be imported on other pages
module.exports = router;