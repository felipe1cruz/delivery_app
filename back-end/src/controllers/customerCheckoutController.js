const customerCheckoutService = require('../services/customerCheckoutService');

const postSales = async (req, res, next) => {
  try {
    const { newSale, newPro } = req.body;
    const pro = await customerCheckoutService.createNewSales(newSale);
    await newPro.map((ma) => {
        return customerCheckoutService.createNewSalesProducts(
          pro.id, ma.productId, ma.quantity,
        );
      });
    return res.status(201).json('created');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postSales,
};
