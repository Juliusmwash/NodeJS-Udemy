const PromiseOne = new Promise((resolve, reject) =>
	setTimeout(resolve("resolved in 3 seconds"), 3000));
const PromiseTwo = new Promise((resolve, reject) =>
	setTimeout(reject("rejected in 3 seconds"), 3000));

Promise.allSettled([PromiseOne, PromiseTwo]).then(data => console.log(data));

/*
Difference between Promise.all and Promise.allSettled
	Promise.all():
		- Resolves when all promises succeed.
		- Rejects immediately if any one promise fails.
		- Returns an array of resolved values.

		Example:
			const p1 = Promise.resolve('A');
			const p2 = Promise.resolve('B');
			const p3 = Promise.resolve('C');

			Promise.all([p1, p2, p3])
				.then(result => console.log(result))
				.catch(err => console.log(err));

			output: ['A', 'B', 'C']

		If one promise fails:
			const p1 = Promise.resolve('A');
			const p2 = Promise.reject('Something went wrong');
			const p3 = Promise.resolve('C');

			Promise.all([p1, p2, p3])
					.then(result => console.log(result))
					.catch(err => console.log(err));

			Output: Something went wrong

		Notice:
				Promise.all() rejects immediately.
				You don't get the results of the successful promises.


	Promise.allSettled():
		- Waits for every promise to finish, whether it succeeds or fails.
		- Never rejects because of individual promise failures.
		- Returns an array describing the outcome of each promise.

		Example:
			const p1 = Promise.resolve('A');
			const p2 = Promise.reject('Something went wrong');
			const p3 = Promise.resolve('C');

			Promise.allSettled([p1, p2, p3])
					.then(result => console.log(result));

			Output:
				[
					{ status: 'fulfilled', value: 'A' },
					{ status: 'rejected', reason: 'Something went wrong' },
					{ status: 'fulfilled', value: 'C' }
				]

		Notice:
			- All promises are allowed to complete.
			- You can inspect both successes and failures.
*/