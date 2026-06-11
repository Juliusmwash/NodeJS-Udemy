const http = require('http');

const PORT = 3000;

const friends = [
	{
		id: 0,
		name: 'Nikola Tesla'
	},
	{
		id: 1,
		name: 'Sir Isaac Newton'
	},
	{
		id: 2,
		name: 'Albert Einstein'
	}
]

const server = http.createServer();
server.listen(PORT);

server.on('request', (req, res) => {
	const items = req.url.split('/') // /friends/2 => ['', 'friends', '2']
	if (req.method === 'POST' && items[1] === 'friends') {
		req.on('data', (data) => {
			const friend = data.toString();
			console.log('Request:', friend);
			friends.push(JSON.parse(friend));
		});
		req.pipe(res);

	} else if (req.method === 'GET' && items[1] === 'friends') {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');

		if (items.length === 3) {
			const friendIndex = parseInt(items[2]);
			res.end(JSON.stringify(friends[friendIndex]))
		} else {
			res.end(JSON.stringify(friends));
		}
	} else if (req.method === 'GET' && items[1] === '/messages') {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/html');
		res.write('<html>');
		res.write('<body>');
		res.write('<ul>');
		res.write('<li>Hello Isaac!</li>');
		res.write('<li>What are your thoughts on astronomy?</li>');
		res.write('</html>');
		res.write('</body>');
		res.write('</ul>');
		res.end();
	} else {
		res.statusCode = 404;
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify({ info: 'Sorry, not implemented yet' }));
	}
})

/*
fetch('http://localhost:3000/friends', {
  method: 'POST',
	body: JSON.stringify({id: 3, name: 'Ryan Dahl'})
})
.then((response) => response.json())
.then((friend) => console.log(friend));
*/