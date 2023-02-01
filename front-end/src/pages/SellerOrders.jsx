import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { requestData } from '../services/requests';

function SellerOrders() {
  const [sellerOrders, setSellerOrders] = useState([]);
  const history = useHistory();

  const dataTestsId = (productId) => {
    const testIdSellerOrder = `seller_orders__element-order-id-${productId}`;
    const testIdDeliveryStatus = `seller_orders__element-delivery-status-${productId}`;
    const testIdOrderDate = `seller_orders__element-order-date-${productId}`;
    const testIdPrice = `seller_orders__element-card-price-${productId}`;
    const testIdAddress = `seller_orders__element-card-address-${productId}`;

    return {
      testIdSellerOrder,
      testIdDeliveryStatus,
      testIdOrderDate,
      testIdPrice,
      testIdAddress,
    };
  };

  useEffect(() => {
    requestData('/customer/orders')
      .then((response) => setSellerOrders(response));
  }, [sellerOrders]);

  const formatarMoeda = (num) => {
    let moeda = String(num);
    moeda = moeda.replace('.', ',');
    return `R$ ${moeda}`;
  };

  const handleClick = (id) => {
    console.log('id', id);
    history.push(`/seller/orders/${id}`);
  };

  return (
    <div>
      <Navbar />
      { sellerOrders.map((ma, index) => (
        <button
          key={ ma.id || index }
          id={ ma.id }
          onClick={ (e) => handleClick(e.target.id) }
          type="button"
        >
          <div
            data-testid={ dataTestsId(ma.id).testIdSellerOrder }
            id={ ma.id }
          >
            {`Pedido ${index + 1}`}
          </div>
          <div
            data-testid={ dataTestsId(ma.id).testIdDeliveryStatus }
            id={ ma.id }
          >
            {ma.status}
          </div>
          <div
            data-testid={ dataTestsId(ma.id).testIdOrderDate }
            id={ ma.id }
          >
            {ma.saleDate}
          </div>
          <div
            data-testid={ dataTestsId(ma.id).testIdPrice }
            id={ ma.id }
          >
            {formatarMoeda(ma.totalPrice)}
          </div>
          <div
            data-testid={ dataTestsId(ma.id).testIdAddress }
            id={ ma.id }
          >
            {`${ma.deliveryAddress} , ${ma.deliveryNumber}`}
          </div>
        </button>
      )) }
    </div>
  );
}

export default SellerOrders;
