const {
	getAllLaunches,
	addNewLaunch,
	existsLaunchWithId,
	abortLaunchById } = require('../../models/launches.model');

const { getPagination } = require('../../services/query');

async function httpGetAllLaunches(req, res) {
	const { skip, limit } = getPagination(req.query);
	const launches = await getAllLaunches(skip, limit);
	return res.status(200).json(launches);
}

async function httpAddNewLaunch(req, res) {
	try {
		const launch = req.body;

		if (!launch.mission || !launch.rocket || !launch.launchDate
			|| !launch.target) {
			return res.status(400).json({
				error: 'Missing required launch property'
			});
		}

		launch.launchDate = new Date(launch.launchDate);
		//if (launch.launchDate.toString() === 'Invalid Date') {
		if (isNaN(launch.launchDate)) {
			return res.status(400).json({
				error: 'Invalid launch date',
			});
		}

		await addNewLaunch(launch);

		return res.status(201).json(launch);
	} catch (err) {
		if (err.code === 'PLANET_NOT_FOUND') {
			return res.status(400).json({ error: 'Unknown habitable planet' });
		}

		return res.status(500).json({ error: 'Server Side Error' });
	}
}

async function httpAbortLaunch(req, res) {
	const launchId = Number(req.params.id);

	if (Number.isNaN(launchId)) {
		return res.status(400).json({
			error: 'Launch id must be a number',
		});
	}

	//if launch doesn't exist
	const existsLaunch = await existsLaunchWithId(launchId);
	if (!existsLaunch) {
		console.log(`launch with id(${launchId}) not found`);
		return res.status(400).json({
			error: 'Launch not found',
		});
	}

	//if launch does exist
	console.log('launch found, heading to abort');
	const aborted = await abortLaunchById(launchId);
	console.log(aborted);

	if (!aborted) {
		return res.status(400).json({
			error: 'Launch not aborted'
		})
	}
	return res.status(200).json({ ok: true });
}

module.exports = {
	httpGetAllLaunches,
	httpAddNewLaunch,
	httpAbortLaunch
}