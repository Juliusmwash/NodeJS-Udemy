const express = require('express');
const path = require('path');

const homeRouter = require('./routes/home.router');
const friendsRouter = require('./routes/friends.router');
const messagesRouter = require('./routes/messages.router');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

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

app.use('/', express.static('public'));
app.use(express.json());

app.use(homeRouter);
app.use('/friends', friendsRouter);
app.use('/messages', messagesRouter);

app.listen(PORT, () => {
	console.log(`Listening on ${PORT}...`);
});