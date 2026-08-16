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
		productsByPrice: (_, args) => {
			return getProductsByPrice(args.min, args.max);
		},
		product: (_, args) => {
			return getProductById(args.id);
		}
	},
	Mutation: {
		addNewProduct: (_, args) => {
			return createNewProduct(args.id, args.description, args.price);
		},
		addNewProductReview: (_, args) => {
			return createNewProductReview(args.id, args.rating, args.comment);
		}
	}
};