const { getAllProducts } = require('./products.model');

module.exports =  {
	Query: {
		products: () => {
			console.log('Getting the products...');
			return getAllProducts();
		},
	}
};