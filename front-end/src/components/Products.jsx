import React, { useEffect, useState } from "react";
import { requestData } from "../services/requests";

function Products() {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState([{ id: 0, valor: 0 }]);

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
        setQuantity([...quantity, { id, valor: quantity.valor + 1 }])
        break;
      case '-':
        setQuantity([...quantity, { id, valor: quantity.valor - 1 }])
        break 
    }
  }

  useEffect(() => {
    requestData("/customer/products")
      .then((response) => setProducts(response))
      .catch();
  }, [products]);

  return (
    <div>
      {products.map((product) => (
        <div
          key={product.id}
          style={{ border: "solid 1px #ccc", margin: "5px", padding: "5px" }}
        >
          <div data-testid={dataTests(product.id).cardPrince}>{product.price}</div>
          <div data-testid={dataTests(product.id).cardTitle}>{product.name}</div>
          <img
            src={product.urlImage}
            data-testid={dataTests(product.id).cardBgImage}
          />
          <button
          type="button"
          data-testid={dataTests(product.id).cardRmItem}
          value="-"
          onClick={ (e) => addRmQuantity(e.target) }
          >
            -
          </button>
          <input
            type="text"
            data-testid={dataTests(product.id).cardQuantity}
            value='0'
          />
          <button
          type="button"
          data-testid={dataTests(product.id).cardAddItem}
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
