function getMessages(req, res) {
	res.send('<ul><li>Helloo Albert!</li></ul>');
}

function postMessage(req, res) {
	console.log('Updating messages...');
    res.json({success: "message updated successfully"});
}

module.exports = {
    getMessages,
    postMessage
};
