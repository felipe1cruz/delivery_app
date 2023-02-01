const { Sales, SalesProducts } = require('../database/models');

const getSales = async () => {
  const allSales = await Sales.findAll();
  return allSales;
};

const getSalesId = async (id) => {
  const allSales = await Sales.findOne({
    where: { id }
  });
  return allSales;
};

const getSalesProducts = async (id) => {
  const allSalesProducts = await SalesProducts.findAll({
    where: { saleId: id }
  });
  return allSalesProducts;
};

module.exports = {
  getSales,
  getSalesId,
  getSalesProducts,
};
