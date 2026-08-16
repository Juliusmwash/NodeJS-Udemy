const { getAllProducts,
	getProductsByPrice,
	getProductById,
	createNewProduct,
	createNewProductReview } = require('./products.model');

module.exports =  {
	Query: {
		products: () => {
			console.log('Getting the products...');
			return getAllProducts();
		},
		productsByPrice: (_, { min, max }) => {
			return getProductsByPrice(min, max);
		},
		product: (_, { id }) => {
			return getProductById(id);
		}
	},
	Mutation: {
		addNewProduct: (_, { id, description, price }) => {
			return createNewProduct(id, description, price);
		},
		addNewProductReview: (_, { id, rating, comment }) => {
			return createNewProductReview(id, rating, comment);
		}
	}
};