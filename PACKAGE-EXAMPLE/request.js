const axios = require('axios');

const url = "https://www.wikipedia.org"
const url2 = "https://www.google.com"

axios.get(url)
	.then((response) => {
		console.log(response);
	})
	.catch((err) => {
		console.log(err);
	})
	.then(() => {
		console.log('All done!');
	});