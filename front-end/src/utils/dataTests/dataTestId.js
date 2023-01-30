const dataTestsId = (productId) => {
  const prefixoCP = 'customer_products__';

  const cardPrince = `${prefixoCP}element-card-price-${productId}`;
  const cardTitle = `${prefixoCP}element-card-title-${productId}`;
  const cardBgImage = `${prefixoCP}img-card-bg-image-${productId}`;
  const cardRmItem = `${prefixoCP}button-card-rm-item-${productId}`;
  const cardQuantity = `${prefixoCP}input-card-quantity-${productId}`;
  const cardAddItem = `${prefixoCP}button-card-add-item-${productId}`;

  const orderDate = `${prefixoCP}element-order-date-${productId}`;
  return {
    cardPrince,
    cardTitle,
    cardBgImage,
    cardRmItem,
    cardQuantity,
    cardAddItem,
    orderDate,
  };
};

export default dataTestsId;
