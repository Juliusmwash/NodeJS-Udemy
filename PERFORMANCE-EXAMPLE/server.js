const express = require('express');
const cluster = require('cluster');
const os = require('os');

const app = express();

function delay(duration) {
    const startTime = Date.now();
    while(Date.now() - startTime < duration) {
        // Event loop is blocked...
    }
}

app.get('/home', (req, res) => {
    res.send(`Performance example: ${process.pid}`);
});

app.get('/timer', (req, res) => {
    // Delay the response
    delay(9000);
    res.send(`Ding ding ding! ${process.pid}`);
});

if (cluster.isPrimary) {
    console.log('Master has been started...');
    const NUM_WORKERS = os.cpus().length;
    for (let i = 0; i < NUM_WORKERS; i++) {
        cluster.fork();
    }
    console.log(`Number of workers started: ${NUM_WORKERS}`);
} else {
    console.log('Worker process has been started.');
    app.listen(3000);
}

/*
Here are some of the real life blocking loops and functions:
    while (...)
    for (...)
    JSON.stringify(hugeObject)
    JSON.parse(hugeString)
    crypto.pbkdf2Sync(...)
    ...

Here are some of the non-blocking functions:
    await fetch(...)
    await fs.promises.readFile(...)
    setTimeout(...)
    setImmediate(...)
    crypto.pbkdf2(...)
    ...

Refer to the following links for site delay explanations and how they directly affect customers
// Nielsen Norman Group
// udemy Blog speed matters
*/