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
    return {
      cardPrince,
      cardTitle,
      cardBgImage,
      cardRmItem,
      cardQuantity,
      cardAddItem,
    };
  };

  const handleQtds = (valor, productId, title, price) => {
    if (valor >= 0) {
      setQuantity([
        ...quantity.filter((fil) => fil.id !== productId),
        {
          id: productId,
          title,
          qtds: Number(valor),
          value: Number(price),
        },
      ]);
    } else if (valor === '-' || valor === '+' || valor === '.') {
      return 0;
    } else {
      return 0;
    }
  };

  const redirecionar = async () => {
    history.push('/customer/checkout');
  };

  const formatarMoeda = (resulteFinal) => resulteFinal.toLocaleString(
    'pt-br',
    { style: 'currency', currency: 'BRL' },
  );

  const calculatevaluesCards = () => {
    const filterValues = quantity.filter((value) => value.qtds !== 0);
    const resulte = filterValues.map((ac) => (ac.qtds * ac.value));
    const resulteFinal = resulte.reduce((ac, va) => ac + va, 0);
    setCardValuePrinces(resulteFinal.toFixed(2));
  };

  const addQuantity = (id, price, title) => {
    setQuantity([
      ...quantity.filter((fil) => fil.id !== id),
      {
        id,
        title,
        qtds: quantity.filter((fil) => fil.id === id)[0].qtds + 1,
        value: Number(price),
      },
    ]);
  };

  const rmQuantity = (id, price, title) => {
    setQuantity([
      ...quantity.filter((fil) => fil.id !== id),
      {
        id,
        title,
        qtds: quantity.filter((fil) => fil.id === id)[0].qtds === 0
          ? 0
          : quantity.filter((fil) => fil.id === id)[0].qtds - 1,
        value: Number(price),
      },
    ]);
  };

  useEffect(() => {
    localStorage.setItem('carrinho', JSON.stringify(quantity
       || { id: 0, title: '', qtds: 0, value: 0 }));
    calculatevaluesCards();
  }, [quantity]);

  useEffect(() => {
    requestData('/customer/products')
      .then((response) => {
        setProducts(response);
        setQuantity([
          ...response.map((ma) => ({
            id: ma.id,
            title: ma.name,
            qtds: 0,
            value: Number(ma.price),
          })),
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
            padding: '5px',
          } }
        >
          <div
            data-testid={ dataTests(product.id).cardPrince }
          >
            { `R$ ${formatarMoeda(product.price).replace('.', ',')}` }
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
            width="100px"
          />
          <button
            type="button"
            data-testid={ dataTests(product.id).cardRmItem }
            value="-"
            onClick={ () => rmQuantity(
              product.id,
              product.price,
              product.name,
            ) }
          >
            -
          </button>
          <input
            type="text"
            pattern="[0-9]+$"
            data-testid={ dataTests(product.id).cardQuantity }
            value={
              quantity.filter((fil) => fil.id === product.id).length > 0
                && quantity.filter((fil) => fil.id === product.id)[0].qtds
            }
            // value={ 0 }
            onChange={ (e) => handleQtds(
              e.target.value,
              product.id,
              product.name,
              product.price,
            ) }
          />
          { console.log() }
          <button
            type="button"
            data-testid={ dataTests(product.id).cardAddItem }
            value="+"
            onClick={ () => addQuantity(
              product.id,
              product.price,
              product.name,
            ) }
          >
            +
          </button>
        </div>
      ))}
      <button
        type="button"
        data-testid="customer_products__button-cart"
        onClick={ () => redirecionar() }
        disabled={ cardValuePrinces === '0.00' }
      >
        {'Ver Carrinho: R$ '}
        <span
          data-testid="customer_products__checkout-bottom-value"
        >
          { cardValuePrinces.toString().replace('.', ',') }
        </span>
      </button>
    </div>

  );
}

export default Products;
