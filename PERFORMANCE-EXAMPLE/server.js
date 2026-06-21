const express = require('express');

const app = express();

function delay(duration) {
    const startTime = Date.now();
    while(Date.now() - startTime < duration) {
        // Event loop is blocked...
    }
}

app.get('/home', (req, res) => {
    res.send('Performance example');
});

app.get('/timer', (req, res) => {
    // Delay the response
    delay(9000);
    res.send('Ding ding ding!');
});

app.listen(3000);

/*
Refer to the following links for site delay explanations and how they directly affect customers
// Nielsen Norman Group
// udemy Blog speed matters
*/