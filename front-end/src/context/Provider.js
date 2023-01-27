import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [token, setToken] = useState('');
  const [pageCheckout, setPageCheckout] = useState('');
  const memorize = React.useMemo(() => ({
    token,
    setToken,
    pageCheckout,
    setPageCheckout,
  }), [
    token,
    setToken,
    pageCheckout,
    setPageCheckout,
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
