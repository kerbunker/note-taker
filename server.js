// imports the data needed for different functions
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// Middleware to connect to frontend data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// connects to separate files for different routes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// connects to the server and displays a message 
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});