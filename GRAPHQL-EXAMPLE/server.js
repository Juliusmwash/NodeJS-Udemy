const path = require('path');
const express = require('express');

const { graphqlHTTP } = require('express-graphql');
const { loadFilesSync } = require('@graphql-tools/load-files');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const typesArray = loadFilesSync('**/*', {
	extensions: ['graphql'],
});

const schema = makeExecutableSchema({
	typeDefs: typesArray,
	resolvers: {
		Query: {
			products: async (parent, args, context, info) => {
				console.log('Getting the products...');
				const products = await Promise.resolve(parent.products);
				return products;
			},
			orders: async (parent, args, context, info) => {
				console.log('Getting the orders...');
				const orders = await Promise.resolve(parent.orders);
				return orders;
			},
		}
	}
});

const root = {
	products: require('./products/products.model.js'),
	orders: require('./orders/orders.model.js')
};

const app = express();

app.use('/graphql', graphqlHTTP({
	schema,
	rootValue: root,
	graphiql: true,
}));

app.listen(3000, () => {
	console.log('Running Graphql server...');
})