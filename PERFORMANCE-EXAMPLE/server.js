const express = require('express');

const app = express();

function delay(duration) {
	const startTime = Date.now();
	while (Date.now() - startTime < duration) {
		// Event loop is blocked...
	}
}

app.get('/home', (req, res) => {
	res.send(`Performance example: ${process.pid}`);
});

app.get('/timer', (req, res) => {
	// Delay the response
	delay(4000);
	res.send(`Beep Beep Beep! ${process.pid}`);
});

app.listen(3000);