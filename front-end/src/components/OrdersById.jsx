import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';
import { requestData } from '../services/requests';
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
        <div>
          Detalhe do Pedido
        </div>
        <div>
          PEDIDO:
          { ' ' }
          { pageOrdersIds.id }
        </div>
        <div>
          { pageOrdersIds.seller }
        </div>
        <div>
          { pageOrdersIds.saleDate }
        </div>
        <div>
          { pageOrdersIds.status }
        </div>
        <button
          type="submit"
          // onClick={ () => submitButtonId(ma.id) }
        >
          MARCAR COMO ENTREGUE
        </button>
      </div>
      <div>
        <OrdersList />
      </div>
    </div>
  );
}

export default OrdersById;
