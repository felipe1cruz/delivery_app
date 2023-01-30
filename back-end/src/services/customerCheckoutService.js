const { Sales } = require('../database/models');

const createNewSales = (body) => {
  const postSales = body.map(async (ma) => {
    await Sales.create({
      userId: ma.userId,
      sellerId: ma.sellerId,
      totalPrice: ma.totalPrice,
      deliveryAddress: ma.deliveryAddress,
      deliveryNumber: ma.deliveryNumber,
      saleDate: ma.saleDate,
      status: ma.status,
    });
  });
  return postSales;
};

module.exports = {
  createNewSales,
};
