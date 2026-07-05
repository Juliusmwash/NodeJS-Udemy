const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

const api = require('./routes/api');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use(morgan('combined'));

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/v1', api);

/*

// The following triggers an error: worked in express 4, but in Express 5 the pattern
//  '/*' is no longer valid.
// The * wildcard must have a parameter name associated with it.

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
})

*/

// The working approaches:
app.use((req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

//app.get(/.*/, (req, res) => {
//    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
//});

module.exports = app;