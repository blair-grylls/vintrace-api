const express = require('express');

const app = express();

const dotenv = require('dotenv');
dotenv.config();

const {NODE_ENV, PORT} = require('./config');

// Breakdowns API Route
app.use('/api', require('./api'));

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
