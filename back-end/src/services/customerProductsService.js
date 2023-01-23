const { Product } = require('../database/models');

const getProducts = async () => {
  const allProducts = await Product.findAll();
  console.log(allProducts);
  return allProducts;
};

module.exports = {
  getProducts,
};