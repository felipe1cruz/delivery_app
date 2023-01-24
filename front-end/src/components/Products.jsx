import React, { useEffect, useState } from 'react';
import { requestData } from '../services/requests';

function Products() {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState([]);

  const dataTests = (productId) => {
    const cardPrince = `customer_products__element-card-price-${productId}`;
    const cardTitle = `customer_products__element-card-title-${productId}`;
    const cardBgImage = `customer_products__img-card-bg-image-${productId}`;
    const cardRmItem = `customer_products__button-card-rm-item-${productId}`;
    const cardQuantity = `customer_products__input-card-quantity-${productId}`;
    const cardAddItem = `customer_products__button-card-add-item-${productId}`;
    return {
      cardPrince,
      cardTitle,
      cardBgImage,
      cardRmItem,
      cardQuantity,
      cardAddItem,
    };
  };

  const addRmQuantity = ({ value }, id) => {
    switch (value) {
    case '+':
      setQuantity([
        ...quantity.filter((fil) => fil.id !== id),
        {
          id,
          qtds: quantity.filter((fil) => fil.id === id)[0].qtds + 1,
        },
      ]);
      break;
    case '-':
      setQuantity([
        ...quantity.filter((fil) => fil.id !== id),
        {
          id,
          qtds: quantity.filter((fil) => fil.id === id)[0].qtds === 0
            ? 0
            : quantity.filter((fil) => fil.id === id)[0].qtds - 1,
        },
      ]);
      break;
    default:
      break;
    }
  };

  useEffect(() => {
    localStorage.setItem('carrinho', JSON.stringify(quantity));
  }, [quantity]);

  useEffect(() => {
    requestData('/customer/products')
      .then((response) => {
        setProducts(response);
        setQuantity([
          ...response.map((ma) => ({ id: ma.id, qtds: 0 })),
        ]);
      })
      .catch();
  }, []);

  return (
    <div>
      {products.map((product) => (
        <div
          key={ product.id }
          style={ {
            border: 'solid 1px #ccc',
            margin: '5px',
            padding: '5px' } }
        >
          <div
            data-testid={ dataTests(product.id).cardPrince }
          >
            {product.price}
          </div>
          <div
            data-testid={ dataTests(product.id).cardTitle }
          >
            {product.name}
          </div>
          <img
            src={ product.urlImage }
            alt={ product.urlImage }
            data-testid={ dataTests(product.id).cardBgImage }
          />
          <button
            type="button"
            data-testid={ dataTests(product.id).cardRmItem }
            value="-"
            onClick={ (e) => addRmQuantity(e.target, product.id) }
          >
            -
          </button>
          <input
            type="text"
            data-testid={ dataTests(product.id).cardQuantity }
            value={
              quantity.filter((fil) => fil.id === product.id)[0] === undefined
                ? 0 : quantity.filter((fil) => fil.id === product.id)[0].qtds
            }
          />
          <button
            type="button"
            data-testid={ dataTests(product.id).cardAddItem }
            value="+"
            onClick={ (e) => addRmQuantity(e.target, product.id) }
          >
            +
          </button>
        </div>
      ))}
    </div>
  );
}

export default Products;
