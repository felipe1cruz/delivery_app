import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { requestData } from '../services/requests';

function Products() {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [cardValuePrinces, setCardValuePrinces] = useState(0);
  const history = useHistory();

  const dataTests = (productId) => {
    const prefixoCP = 'customer_products__';

    const cardPrince = `${prefixoCP}element-card-price-${productId}`;
    const cardTitle = `${prefixoCP}element-card-title-${productId}`;
    const cardBgImage = `${prefixoCP}img-card-bg-image-${productId}`;
    const cardRmItem = `${prefixoCP}button-card-rm-item-${productId}`;
    const cardQuantity = `${prefixoCP}input-card-quantity-${productId}`;
    const cardAddItem = `${prefixoCP}button-card-add-item-${productId}`;
    const cardButton = `${prefixoCP}button-cart${productId}`;
    const cardButtonValue = `${prefixoCP}checkout-bottom-value${productId}`;
    return {
      cardPrince,
      cardTitle,
      cardBgImage,
      cardRmItem,
      cardQuantity,
      cardAddItem,
      cardButton,
      cardButtonValue,
    };
  };

  const redirecionar = () => {
    history.push('/customer/checkout');
  };

  const calculatevaluesCards = () => {
    const filterValues = quantity.filter((value) => value.qtds !== 0);
    const resulte = filterValues.map((ac) => (ac.qtds * ac.value));
    const resulteFinal = resulte.reduce((ac, va) => ac + va, 0);
    const valorFormatado = resulteFinal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    setCardValuePrinces(valorFormatado);
  };

  const addRmQuantity = ({ value }, id, price) => {
    switch (value) {
    case '+':
      setQuantity([
        ...quantity.filter((fil) => fil.id !== id),
        {
          id,
          qtds: quantity.filter((fil) => fil.id === id)[0].qtds + 1,
          value: Number(price),
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
          value: Number(price),
        },
      ]);
      break;
    default:
      break;
    }
  };

  useEffect(() => {
    localStorage.setItem('carrinho', JSON.stringify(quantity));
    calculatevaluesCards();
  }, [quantity]);

  useEffect(() => {
    requestData('/customer/products')
      .then((response) => {
        setProducts(response);
        setQuantity([
          ...response.map((ma) => ({
            id: ma.id,
            title: ma.title,
            qtds: 0,
            value: Number(ma.price)
          })),
        ]);
      })
      .catch();
  }, []);

  return (
    <div>
      {products.map((product) => (
        <div
          key={product.id}
          style={{
            border: 'solid 1px #ccc',
            margin: '5px',
            padding: '5px'
          }}
        >
          <div
            data-testid={dataTests(product.id).cardPrince}
          >
            {product.price}
          </div>
          <div
            data-testid={dataTests(product.id).cardTitle}
          >
            {product.name}
          </div>
          <img
            src={product.urlImage}
            alt={product.urlImage}
            data-testid={dataTests(product.id).cardBgImage}
            width='100px'
          />
          <button
            type="button"
            data-testid={dataTests(product.id).cardRmItem}
            value="-"
            onClick={(e) => addRmQuantity(e.target, product.id, product.price)}
          >
            -
          </button>
          <input
            type="text"
            data-testid={dataTests(product.id).cardQuantity}
            value={quantity.filter((fil) => fil.id === product.id)[0] === undefined
              ? 0 : quantity.filter((fil) => fil.id === product.id)[0].qtds} />
          <button
            type="button"
            data-testid={dataTests(product.id).cardAddItem}
            value="+"
            onClick={(e) => addRmQuantity(e.target, product.id, product.price)}
          >
            +
          </button>
        </div>
      ))}

      <br />
      <form>
        <button
          type="submit"
          data-testid={dataTests().cardButton}
          onClick={ () => redirecionar() }
        >
            <div
              data-testid={dataTests().cardButtonValue}
            >
              {`Ver Carrinho: ${ cardValuePrinces }`}
            </div>
        </button>
      </form>
      
    </div>
  
  );
}

export default Products;
