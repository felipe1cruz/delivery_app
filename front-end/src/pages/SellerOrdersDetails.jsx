import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { requestData } from '../services/requests';

function SellerOrdersDetails() {
  const { id } = useParams();
  const [productsOrder, setProductsOrder] = useState([]);
  const [products, setProducts] = useState([]);
  const [list, setList] = useState([]);
  const [orderId, setOrderId] = useState([]);
  const [total, setTotal] = useState(0);
  //   const history = useHistory();

  const dataTestsId = (index) => {
    const orderTable = `seller_order_details__element-order-table-item-number-${index}`;
    const orderTableName = `seller_order_details__element-order-table-name-${index}`;
    const orderTableQty = `seller_order_details__element-order-table-quantity-${index}`;
    const orderTablePrice = `seller_order_details__element-order-table-quantity-${index}`;
    const orderTableSub = `seller_order_details__element-order-table-sub-total-${index}`;

    return {
      orderTable,
      orderTableName,
      orderTableQty,
      orderTablePrice,
      orderTableSub,
    };
  };

  useEffect(() => {
    requestData(`/customer/orders/${id}`)
      .then((response) => setOrderId(response));

    requestData(`/seller/orders/${id}`)
      .then((response) => setProductsOrder(response));

    requestData('/customer/products')
      .then((response) => setProducts(response));
  }, []);

  useEffect(() => {
  }, [list]);

  useEffect(() => {
    let lista = [];
    let soma = 0;
    productsOrder.map((productOrder) => {
      products.map((product) => {
        if (productOrder.productId === product.id) {
          lista = [...lista, {
            name: product.name,
            quantity: productOrder.quantity,
            price: Number(product.price),
            subtotal: productOrder.quantity * product.price }];
          soma = (productOrder.quantity * product.price) + soma;
        }
        return null;
      });
      return null;
    });
    setList(lista);
    setTotal(soma);
  }, [productsOrder, products, total]);

  const formatarMoeda = (num) => {
    let moeda = String(num);
    moeda = moeda.replace('.', ',');
    return `R$ ${moeda}`;
  };

  //   const handleClick = (id) => {
  //     console.log('id', id);
  //     history.push(`/seller/orders/${id}`);
  //   };

  return (
    <div>
      <Navbar />
      <h2>Detalhes do Pedido</h2>
      <span
        data-testId="seller_order_details__element-order-details-label-order-id"
      >
        {` Pedido ${id} `}
      </span>
      <span
        data-testId="seller_order_details__element-order-details-label-order-date"
      >
        { orderId.saleDate }
      </span>
      <span
        data-testId="seller_order_details__element-order-details-label-delivery-status"
      >
        { orderId.status }
      </span>
      <button
        type="button"
        data-testId="seller_order_details__button-preparing-check"
      >
        Preparar Pedido
      </button>
      <button
        type="button"
        data-testId="seller_order_details__button-dispatch-check"
      >
        Saiu Para Entrega
      </button>
      { list.map((ma, index) => (
        <div
          key={ ma.id || index }
          id={ ma.id }
        >
          <span
            data-testid={ dataTestsId(index).orderTable }
            id={ ma.id }
          >
            {index + 1}
          </span>
          <span
            data-testid={ dataTestsId(index).orderTableName }
            id={ ma.id }
          >
            {ma.name}
          </span>
          <span
            data-testid={ dataTestsId(index).orderTableQty }
            id={ ma.id }
          >
            {ma.quantity}
          </span>
          <span
            data-testid={ dataTestsId(index).orderTablePrice }
            id={ ma.id }
          >
            {formatarMoeda(ma.price)}
          </span>
          <span
            data-testid={ dataTestsId(index).orderTableSub }
            id={ ma.id }
          >
            {formatarMoeda(ma.subtotal.toFixed(2))}
          </span>
        </div>
      )) }
      <div
        data-testid="seller_order_details__element-order-total-price"
      >
        {`TOTAL ${formatarMoeda(total.toFixed(2))}`}
      </div>
    </div>
  );
}

export default SellerOrdersDetails;
