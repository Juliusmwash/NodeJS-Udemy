const express = require('express');

const homeRouter = require('./routes/home.router');
const friendsRouter = require('./routes/friends.router');
const messagesRouter = require('./routes/messages.router');

const app = express();

const PORT = 3000;


app.use((req, res, next) => {
	const start = Date.now();

	res.on('finish', () => {
		console.log(
			`${req.method} ${req.baseUrl}${req.url} ${Date.now() - start}ms`
		);
	});

	next();
});

app.use(express.json());

app.use(homeRouter);
app.use('/friends', friendsRouter);
app.use('/messages', messagesRouter);

app.listen(PORT, () => {
	console.log(`Listening on ${PORT}...`);
});