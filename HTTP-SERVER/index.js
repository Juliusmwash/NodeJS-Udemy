const http = require('http');

const PORT = 3000;
const server = http.createServer();

server.on('request', (req, res) => {
	const items = req.url.split('/')
	if (req.url === '/friends') {
		res.writeHead(200, {
			'Content-Type': 'text/plain'
		});
		res.end('Hello! Sir Isaac Newton is your friend!');
	} else if (req.url === '/messages') {
		res.writeHead(200, {
			'Content-Type': 'text/html'
		});
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
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});
		res.end(JSON.stringify({ info: 'not implemented' }));
	}
})

server.listen(PORT, () => {
	console.log(`Listening on port ${PORT}...`);
});