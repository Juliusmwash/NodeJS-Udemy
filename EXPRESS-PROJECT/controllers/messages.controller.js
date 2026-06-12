const path = require('path');

function getMessages(req, res) {
	res.render('messages', {
		title: "Messages to my friends!",
		friend:  "Elon Musk"
	});
	//res.sendFile(path.join(__dirname, '..', 'public', 'images', 'skimountain.jpeg'));
	// res.send('<ul><li>Helloo Albert!</li></ul>');
}

function postMessage(req, res) {
	console.log('Updating messages...');
	res.json({ success: "message updated successfully" });
}

module.exports = {
	getMessages,
	postMessage
};
