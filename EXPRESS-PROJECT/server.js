const express = require('express');

const app = express();

const PORT = 3000;

const friends = [
	{
		id: 0,
		name: 'Albert Einstein'
	},
	{
		id: 1,
		name: 'Sir Isaac Newton'
	},
	{
		id: 1,
		name: 'Julius Mwangi'
	}
]

app.use((req, res, next) => {
	const start = Date.now();
	next();
	const delta = Date.now() - start;
	console.log(`${req.method} ${req.url} ${delta}ms`);
})

app.get('/', (req, res) => {
	res.send('Heeeellooooooo!');
});

app.get('/friends', (req, res) => {
	res.json(friends);
});

app.get('/friends/:friendId', (req, res) => {
	const friendId = Number(req.params.friendId);

	/*
	if (
		Number.isNaN(friendId) ||
		friendId < 0 ||
		friendId >= friends.length
	) {
		return res.status(404).json({
			error: `ID must be a number between 0 and ${friends.length - 1}`
		});
	}

	res.status(200).json(friends[friendId]);
	*/

	// A simpler method
	const friend = friends[friendId];
	if (friend) {
		res.status(200).json(friend);
	} else {
		res.status(404).json({
			error: `ID must be a number between 0 and ${friends.length - 1}`
		})
	}
});

app.get('/messages', (req, res) => {
	res.send('<ul><li>Helloo Albert!</li></ul>');
});

app.post('/messages', (req, res) => {
	console.log('Updating messages...');
});

app.listen(PORT, () => {
	console.log(`Listening on ${PORT}...`);
});