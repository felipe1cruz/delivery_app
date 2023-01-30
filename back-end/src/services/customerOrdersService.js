const { Sales } = require('../database/models');

const getSales = async () => {
  const allSales = await Sales.findAll();
  return allSales;
};

module.exports = {
  getSales,
};
