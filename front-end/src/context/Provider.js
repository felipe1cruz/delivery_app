import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [token, setToken] = useState('');
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [cardValuePrinces, setCardValuePrinces] = useState(0);
  const [pageCheckout, setPageCheckout] = useState('');

  const memorize = React.useMemo(() => ({
    token,
    setToken,
    pageCheckout,
    setPageCheckout,
    products,
    setProducts,
    quantity,
    setQuantity,
    cardValuePrinces,
    setCardValuePrinces,
  }), [
    token,
    setToken,
    pageCheckout,
    setPageCheckout,
    products,
    setProducts,
    quantity,
    setQuantity,
    cardValuePrinces,
    setCardValuePrinces,
  ]);
  return (
    <Context.Provider
      value={ memorize }
    >
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
