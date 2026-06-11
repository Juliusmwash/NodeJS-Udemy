const friends = require('../models/friends.model');

function getFriends(req, res) {
    console.log(friends);
	res.json(friends);
}

function getFriend(req, res) {
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
}

function postFriend(req, res) {
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
}

module.exports = {
    getFriends,
    getFriend,
    postFriend
}