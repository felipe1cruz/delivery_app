import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import CustomerProducts from '../pages/CustomerProducts';
import CustomerCheckout from '../pages/CustomerCheckout';
import CustomerOrders from '../pages/CustomerOrders';
import SellerOrders from '../pages/SellerOrders';
import Login from '../pages/Login';
import Register from '../pages/Register';

function Routes() {
  return (
    <Switch>
      <Route path="/login" component={ Login } />
      <Route path="/register" component={ Register } />
      <Route path="/customer/products" component={ CustomerProducts } />
      <Route path="/customer/checkout" component={ CustomerCheckout } />
      <Route path="/customer/orders" component={ CustomerOrders } />
      <Route path="/seller/orders" component={ SellerOrders } />
      <Route exact path="/"><Redirect to="/login" /></Route>
    </Switch>
  );
}

export default Routes;
