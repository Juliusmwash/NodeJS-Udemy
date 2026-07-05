const request = require('supertest');
const app = require('../../app');
const { mongoConnect, mongoDisconnect } = require('../../services/mongo');

describe('Launches API', () => {
	beforeAll(async () => {
		await mongoConnect();
	});

	afterAll(async () => {
		await mongoDisconnect();
	});

	describe('Test GET /launches', () => {
		test('It should respond with 200 success', async () => {
			const response = await request(app)
				.get('/v1/launches')
				.expect('Content-Type', /json/)
				.expect(200);
		});
	});

	describe('Test POST /launches', () => {
		const completeLaunchData = {
			mission: 'USS Enterprise',
			rocket: 'NCC 1701-D',
			launchDate: 'January 4, 2028',
			target: 'Kepler-442 b',
		};

		const launchDataWithInvalidPlanet = {
			mission: 'USS Enterprise',
			rocket: 'NCC 1701-D',
			launchDate: 'January 4, 2028',
			target: 'Kepler-234 j',
		};

		const launchDataWithoutDate = {
			mission: 'USS Enterprise',
			rocket: 'NCC 1701-D',
			target: 'Kepler-442 b',
		};

		const launchDataWithInvalidDate = {
			mission: 'USS Enterprise',
			rocket: 'NCC 1701-D',
			launchDate: 'Invalid Date',
			target: 'Kepler-186 f',
		}

		test('It should respond with 201 created', async () => {
			const response = await request(app)
				.post('/v1/launches')
				.send(completeLaunchData)
				.expect('Content-Type', /json/)
				.expect(201);

			const requestDate = new Date(completeLaunchData.launchDate).valueOf();
			const responseDate = new Date(response.body.launchDate).valueOf();
			expect(responseDate).toBe(requestDate);

			expect(response.body).toMatchObject(launchDataWithoutDate);
		});

		test('It should catch an invalid habitable planet and respond with 400 Bad Request', async () => {
			const response = await request(app)
				.post('/v1/launches')
				.send(launchDataWithInvalidPlanet)
				.expect('Content-Type', /json/)
				.expect(400);

			expect(response.body).toStrictEqual({
				error: 'Unknown habitable planet'
			});
		});

		test('It should catch missing required properties', async () => {
			const response = await request(app)
				.post('/v1/launches')
				.send(launchDataWithoutDate)
				.expect('Content-Type', /json/)
				.expect(400);

			expect(response.body).toStrictEqual({
				error: 'Missing required launch property'
			});
		});

		test('It should catch invalid dates', async () => {
			const response = await request(app)
				.post('/v1/launches')
				.send(launchDataWithInvalidDate)
				.expect('Content-Type', /json/)
				.expect(400);

			expect(response.body).toStrictEqual({
				error: 'Invalid launch date'
			});
		});
	});
});