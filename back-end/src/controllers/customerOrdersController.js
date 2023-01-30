const customerOrdersService = require('../services/customerOrdersService');

const sales = async (_req, res) => {
  const allSales = await customerOrdersService.getSales();
  return res.status(200).json(allSales);
};

// const salesId = async (req, res) => {
//   const { id } = req.params;
//   const allSales = await customerOrdersService.getSalesId(id);
//   return res.status(200).json(allSales);
// };

module.exports = {
  sales,
};
