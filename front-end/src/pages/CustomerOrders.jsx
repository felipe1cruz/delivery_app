import React, { useEffect, useContext } from 'react';
import Navbar from '../components/Navbar';
import Context from '../context/Context';
import { requestData } from '../services/requests';
import dataTestsId from '../utils/dataTests/dataTestId';

function CustomerOrders() {
  const {
    pageOrders,
    setPageOrders,
  } = useContext(Context);

  useEffect(() => {
    const requestSales = requestData('/customer/orders/');
    setPageOrders([requestSales]);
  }, [setPageOrders]);

  console.log(pageOrders);
  return (
    <div>
      <Navbar />
      { pageOrders.map((ma, index) => (
        <div key={ ma.id || index }>
          <button
            type="submit"
            data-testid={ dataTestsId(ma.id).orderDate }
            onClick={ () => submitButton() }
          >
            <div>
              { ma.id }
            </div>
            <div>
              { ma.status }
            </div>
            <div>
              <div>{ ma.data }</div>
              <div>{ ma.totalPrice }</div>
            </div>
          </button>
        </div>
      )) }
    </div>
  );
}

export default CustomerOrders;
