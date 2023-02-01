import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';
import dataTestsId from '../utils/dataTests/dataTestId';

function Orders() {
  const {
    pageOrders,
  } = useContext(Context);

  const history = useHistory();

  const submitButtonId = (id) => {
    history.push(`/customer/orders/${id}`);
  };

  return (
    pageOrders.map((ma) => (
      <div key={ ma.id }>
        <button
          type="submit"
          onClick={ () => submitButtonId(ma.id) }
        >
          <div
            data-testid={ dataTestsId(ma.id).orderId }
          >
            { ma.id }
          </div>
          <div
            data-testid={ dataTestsId(ma.id).orderStatus }
          >
            { ma.status }
          </div>
          <div>
            <div
              data-testid={ dataTestsId(ma.id).orderDate }
            >
              { ma.saleDate }
            </div>
            <div
              data-testid={ dataTestsId(ma.id).cardPrince }
            >
              { ma.totalPrice }
            </div>
          </div>
        </button>
      </div>
    ))
  );
}

export default Orders;
