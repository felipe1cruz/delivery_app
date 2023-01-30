const customerCheckoutService = require('../services/customerCheckoutService');

const postSales = async (req, res, next) => {
  try {
    const data = await customerCheckoutService.createNewSales(req.body);
    if (data) {
      return res.status(201).json('created');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postSales,
};
