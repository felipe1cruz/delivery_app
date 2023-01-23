import React, { useEffect, useState } from 'react';
import { requestData } from '../services/requests';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    requestData('/customer/products')
      .then((response) => setProducts(response))
      .catch((e) => console.log(e));
  }, [products]);

  return (
    <div>{products}</div>
  );
}

export default Products;
