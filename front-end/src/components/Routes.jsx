import React from 'react';
import { Route } from 'react-router-dom';
import CustomerProducts from '../pages/CustomerProducts';

function Routes() {
  return (
    <Route path="/customer/products" component={ CustomerProducts } />
  );
}

export default Routes;
