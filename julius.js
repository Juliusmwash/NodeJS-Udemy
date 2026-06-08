const animals = {
	tiger: 23,
	lion: 5,
	monkey: 2,
	bird: 40
}

const { tiger, monkey, ...rest } = animals;

console.log(tiger);
console.log(monkey);
console.log(rest);

const promisify = (item, delay) =>
	new Promise((resolve) => {
		setTimeout(() => resolve(item), delay);
	});

const a = () => promisify('a', 100);
const b = () => promisify('b', 5000);
const c = () => promisify('c', 3000);

async function parallel() {
	const promises = [a(), b(), c()];
	const [output1, output2, output3] = await Promise.all(promises);
	return `parallel is done: ${output1} ${output2} ${output3}`;
}

async function race() {
	const promises = [a(), b(), c()];
	const output1 = await Promise.race(promises);
	return `race is done: ${output1}`;
}

async function sequence() {
	const output1 = await a();
	const output2 = await b();
	const output3 = await c();
	return `sequence is done ${output1} ${output2} ${output3}`;
}

parallel().then(console.log);
race().then(console.log);
sequence().then(console.log);