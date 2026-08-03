const products = [
	{
		id: 'redshoe',
		description: 'Red Shoe',
		price: 42.12,
	},
	{
		id: 'buejeans',
		description: 'Blue Jeans',
		price: 55.55,
	}
]

function getAllProducts() {
	return products;
}

module.exports = {
	getAllProducts
}