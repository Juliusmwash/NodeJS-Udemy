const launches = require('./launches.mongo');
const planets = require('./planets.mongo')

const DEFAULT_FLIGHT_NUMBER = 100;

// const launch = {
// 	flightNumber: 100,
// 	mission: 'Kepler Exploration X',
// 	rocket: 'Explorer IS1',
// 	launchDate: new Date('December 29, 2030'),
// 	target: 'Kepler-442 b',
// 	customers: ['ZTM', 'NASA'],
// 	upcoming: true,
// 	success: true,
// };

// saveLaunch(launch);

async function existsLaunchWithId(launchId) {
	return await launches
		.findOne({ 'flightNumber': launchId });
}

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

async function getAllLaunches() {
	// return Array.from(launches.values());
	return await launches.find({}, { '_id': 0, '__v': 0 });
}

async function saveLaunch(launch) {
	try {
		const planet = await planets.findOne({
			keplerName: launch.target
		});

		if (!planet) {
			throw new Error('No matching planet found');
		}

		await launches.findOneAndUpdate({
			flightNumber: launch.flightNumber,
		}, launch, {
			upsert: true
		})
	} catch (err) {
		console.log(`saveLaunch Error: ${err}`);
	}
}

async function addNewLaunch(launch) {
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
	addNewLaunch,
	abortLaunchById
};