const express = require('express');

const homeRouter = express.Router();

homeRouter.get('/', (req, res) => {
	res.render('index', {
		title: "Explore The World!",
		caption: "The world is beautiful."
	})
	// res.send('Heeeellooooooo!');
});

module.exports = homeRouter;
