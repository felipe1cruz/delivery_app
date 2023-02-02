import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';
import { requestData } from '../services/requests';
// import dataTestsId from '../utils/dataTests/dataTestId';
import OrdersList from './OrdersList';

function OrdersById() {
  const {
    pageOrdersIds,
    setPageOrdersIds,
    setOrdersList,
  } = useContext(Context);

  const history = useHistory();

  const historyLocOath = history.location.pathname;

  const pageOrdersIdGet = async () => {
    const sales = await requestData(historyLocOath);
    const requestSallers = await requestData('/sellers');
    const requestSalesProducts = await requestData(`/salesProducts/${sales.id}`);
    const requestProducts = await requestData('/customer/products');
    setPageOrdersIds({
      id: sales.id,
      seller: requestSallers[0].name,
      saleDate: sales.saleDate,
      status: sales.status,
    });
    const ver = requestSalesProducts.map((ma) => ({
      name: requestProducts.filter((fil) => fil.id === ma.productId)[0].name,
      qtds: ma.quantity,
      price: requestProducts.filter((fil) => fil.id === ma.productId)[0].price,
    }));
    setOrdersList(ver);
  };

  useEffect(() => {
    pageOrdersIdGet();
  }, []);

  return (
    <div key={ pageOrdersIds.id }>
      <div>
        Detalhe do Pedido
        <br />
        <div data-testid="customer_order_details__element-order-details-label-order-id">
          PEDIDO:
          { ' ' }
          { pageOrdersIds.id }
        </div>
        <div
          data-testid="customer_order_details__element-order-details-label-seller-name"
        >
          { pageOrdersIds.seller }
        </div>
        <div
          data-testid="customer_order_details__element-order-details-label-order-date"
        >
          { pageOrdersIds.saleDate }
        </div>
        <div
          data-testid={ `customer_order_details__element-order-
          details-label-delivery-status${pageOrdersIds.id}` }
        >
          { pageOrdersIds.status }
        </div>
        <button
          type="submit"
          data-testid="customer_order_details__button-delivery-check"
          // onClick={ () => submitButtonId(ma.id) }
        >
          MARCAR COMO ENTREGUE
        </button>
      </div>
      <div>
        <br />
        <OrdersList />
      </div>
    </div>
  );
}

export default OrdersById;
