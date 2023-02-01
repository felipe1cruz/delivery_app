const dataTestsId = (productId) => {
  const prefixoCP = 'customer_products__';

  const cardPrince = `${prefixoCP}element-card-price-${productId}`;
  const cardTitle = `${prefixoCP}element-card-title-${productId}`;
  const cardBgImage = `${prefixoCP}img-card-bg-image-${productId}`;
  const cardRmItem = `${prefixoCP}button-card-rm-item-${productId}`;
  const cardQuantity = `${prefixoCP}input-card-quantity-${productId}`;
  const cardAddItem = `${prefixoCP}button-card-add-item-${productId}`;

  const orderDate = `${prefixoCP}element-order-date-${productId}`;

  const prefix = 'customer_orders__';

  const orderId = `${prefix}element-order-id-${productId}`;
  const orderStatus = `${prefix}element-delivery-status-${productId}`;
  const elementOrderDate = `${prefix}element-order-date-${productId}`;
  const orderPrice = `${prefix}element-card-price-${productId}`;

  return {
    cardPrince,
    cardTitle,
    cardBgImage,
    cardRmItem,
    cardQuantity,
    cardAddItem,
    orderDate,
    orderId,
    orderStatus,
    orderPrice,
    elementOrderDate,
  };
};

export default dataTestsId;
