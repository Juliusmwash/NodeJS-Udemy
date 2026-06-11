const express = require('express');

const friendsController = require('./controllers/friends.controller');
const messagesController = require('./controllers/messages.controller');

const app = express();

const PORT = 3000;



/*
app.use((req, res, next) => {
	const start = Date.now();
	next();
	const delta = Date.now() - start;
	console.log(`${req.method} ${req.url} ${delta}ms`);
})
*/

// The following is more accurate incase asynchronous work is started in between the process
app.use((req, res, next) => {
	const start = Date.now();

	res.on('finish', () => {
		console.log(
			`${req.method} ${req.url} ${Date.now() - start}ms`
		);
	});

	next();
});

app.use(express.json());

app.get('/', (req, res) => {
	res.send('Heeeellooooooo!');
});

app.get('/friends', friendsController.getFriends);
app.post('/friends', friendsController.postFriend);
app.get('/friends/:friendId', friendsController.getFriend);

app.get('/messages', messagesController.getMessages);
app.post('/messages', messagesController.postMessage);

app.listen(PORT, () => {
	console.log(`Listening on ${PORT}...`);
});