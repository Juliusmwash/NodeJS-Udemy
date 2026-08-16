const express = require('express');

const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@as-integrations/express5');

const { loadFilesSync } = require('@graphql-tools/load-files');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const typesArray = loadFilesSync('**/*.graphql', {
	cwd: __dirname,
});

const resolversArray = loadFilesSync('**/*.resolvers.js', {
	cwd: __dirname,
});

async function startApolloServer() {
	const app = express();

	const schema = makeExecutableSchema({
		typeDefs: typesArray,
		resolvers: resolversArray,
	});

	const server = new ApolloServer({
		schema,
	});

	await server.start();

	app.use(
		'/graphql',
		express.json(),
		expressMiddleware(server)
	);

	app.listen(3000, () => {
		console.log('Running GraphQL server at http://localhost:3000/graphql');
	});
}

startApolloServer();