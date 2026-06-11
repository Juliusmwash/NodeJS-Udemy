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
		id: 2,
		name: 'Julius Mwangi'
	}
]

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

app.post('/friends', (req, res) => {
	console.log(req.headers['content-type']);
	console.log(req.body);

	//if (!req.body.name)
	if (!req.body?.name) {  // The ?. operator safely handles req.body === undefined, incase the Content-Type header is not set to application/json
		return res.status(400).json({
			error: 'Missing friend name'
		})
	}
	const newFriend = {
		id: friends.length,
		name: req.body.name
	};
	friends.push(newFriend);

	res.json(newFriend);
});

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