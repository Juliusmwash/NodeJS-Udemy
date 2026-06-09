const { request, get } = require('https');
/*
const req = request('https://www.google.com', (res) => {
	res.on('data', (chunk) => {
		console.log(`Data chunk: ${chunk}`);
	});
	res.on('end', () => {
		console.log('No more data');
	});
});
req.end();
*/

get('https://www.google.com', (res) => {
	let data = '';

	res.on('data', (chunk) => {
		data += chunk;
	});
	res.on('end', () => {
		console.log(`Data chunk: ${chunk}`);
	});
});



