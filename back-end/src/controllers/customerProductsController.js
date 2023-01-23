const customerProductsService = require('../services/customerProductsService');

const products = async (_req, res) => {
  const allProducts = await customerProductsService.getProducts();
  return res.status(200).json(allProducts);
};

module.exports = {
  products,
};