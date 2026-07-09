const axios = require('axios');

const launches = require('./launches.mongo');
const planets = require('./planets.mongo')

const DEFAULT_FLIGHT_NUMBER = 100;

async function getLatestFlightNumber() {
	const latestLaunch = await launches
		.findOne()
		.sort({ flightNumber: -1 }); // Descending order
	// should not be relied upon as a safe auto-increment mechanism in a concurrent environment.

	if (!latestLaunch) {
		return DEFAULT_FLIGHT_NUMBER;
	}

	return latestLaunch.flightNumber;
}

async function getAllLaunches(skip, limit) {
	return await launches
		.find({}, { '_id': 0, '__v': 0 })
		.sort({
			flightNumber: 1 })
		.skip(skip)
		.limit(limit);
}

async function saveLaunch(launch) {
	await launches.findOneAndUpdate({
		flightNumber: launch.flightNumber,
	}, launch, {
		upsert: true
	});
}

async function populateLaunches() {
	console.log('Downloading launch data...');

	let THESPACEDEVS_API_URL = 'https://lldev.thespacedevs.com/2.4.0/launches/?limit=100';
	let launchObjectsArray = [];

	while (THESPACEDEVS_API_URL) {
		const response = await axios.get(THESPACEDEVS_API_URL);
		const upcomingStatuses = [
			"Go",
			"Hold",
			"TBD",
			"TBC",
			"In Flight"
		];

		if (response.status !== 200) {
			console.log('Problem downloading launch data.');
			throw new Error('Launch data download failed.');
		}

		launchObjectsArray.push(
			...response.data.results.map((launchResult) => {
				const flightNumber = parseInt(launchResult.mission?.id, 10);

				if (!Number.isFinite(flightNumber)) {
					console.log('Failed to parse launchResult.mission?.id into a Number\n');
					return null;
				}
				return {
					flightNumber,
					mission: launchResult.mission?.name ?? launchResult.name,
					rocket: launchResult.rocket?.configuration?.name,
					launchDate: new Date(launchResult.net),
					customers: launchResult.mission?.agencies?.map(a => a.name) ?? [],
					upcoming: upcomingStatuses.includes(launchResult.status?.abbrev),
					success: launchResult.status?.abbrev === "Success",
				};
			})
		);

		THESPACEDEVS_API_URL = response.data.next;
	}

	console.log('Saving data to the database...');
	await Promise.all(
		launchObjectsArray
			.filter(launch => launch !== null)
			.map(launch => saveLaunch(launch))
	);

	console.log(`Done saving ${launchObjectsArray.length} launches`);
	// console.log(launchObjectsArray);
}

async function loadLaunchData() {
	const firstLaunch = await findLaunch({
		flightNumber: 6302,
		rocket: 'H3-24',
		mission: 'HTV-X3',
	});

	if (firstLaunch) {
		console.log('Launch data already loaded');
	} else {
		await populateLaunches();
	}
}

async function findLaunch(filter) {
	return await launches.findOne(filter);
}

async function existsLaunchWithId(launchId) {
	return await findLaunch({ 'flightNumber': launchId });
}

async function addNewLaunch(launch) {
	const planet = await planets.findOne({
		keplerName: launch.target
	});

	if (!planet) {
		const error = new Error('No matching planet found!');
		error.code = 'PLANET_NOT_FOUND';

		throw error;
	}

	const newFlightNumber = await getLatestFlightNumber() + 1;

	const newLaunch = Object.assign(launch, {
		success: true,
		upcoming: true,
		customers: ['Zero to Mastery', 'NASA'],
		flightNumber: newFlightNumber,
	});

	await saveLaunch(newLaunch);
}

async function abortLaunchById(launchId) {
	const aborted = await launches.updateOne({
		flightNumber: launchId
	}, {
		upcoming: false,
		success: false
	});

	console.log(aborted);
	return (
		aborted.acknowledged === true &&
		aborted.matchedCount === 1 &&
		aborted.modifiedCount === 1
	);
}

module.exports = {
	existsLaunchWithId,
	getAllLaunches,
	loadLaunchData,
	addNewLaunch,
	abortLaunchById
};