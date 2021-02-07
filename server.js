const express = require('express');
const cors = require('cors')

const app = express();

const dotenv = require('dotenv');
dotenv.config();

const {NODE_ENV, PORT} = require('./config');

app.use(cors());

// Breakdowns API Route
app.use('/api', require('./api'));

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
