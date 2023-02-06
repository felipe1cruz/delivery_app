import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavbarSeller from '../components/NavbarSeller';
import { requestData, updateSales } from '../services/requests';

function SellerOrdersDetails() {
  const { id } = useParams();
  const [productsOrder, setProductsOrder] = useState([]);
  const [products, setProducts] = useState([]);
  const [list, setList] = useState([]);
  const [orderId, setOrderId] = useState([]);
  const [total, setTotal] = useState(0);
  const [preparando, setPreparando] = useState(false);
  const [transito, setTransito] = useState(false);
  const [status, setStatus] = useState('');
  const [data, setData] = useState('');
  const emTransito = 'Em Trânsito';
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

  // const history = useHistory();

  const statusPedido = async (newStatus) => {
    if (newStatus === 'Preparando' || newStatus === emTransito) setPreparando(true);
    if (newStatus === transito) setTransito(true);
    await updateSales(`/salesProducts/${id}`, { status: newStatus });
    setStatus(newStatus);
    // history.push('/seller/orders');
  };

  const formarData = (ma) => {
    if (ma) {
      const dia = ma.split('-')[2].split('T')[0];
      const mes = ma.split('-')[1];
      const ano = ma.split('-')[0];
      return `${dia}/${mes}/${ano}`;
    }
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
    setStatus(orderId.status);
    setData(orderId.saleDate);
  }, [orderId]);

  useEffect(() => {
    setStatus(orderId.status);
    setData(orderId.saleDate);
  }, [orderId]);

  useEffect(() => {
  }, [status, setStatus]);

  useEffect(() => {
  }, [data, setData, formarData]);

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

    if (orderId.status === 'Preparando'
    || orderId.status === emTransito) setPreparando(true);
    if (orderId.status === emTransito
    || orderId.status === 'Pendente') setTransito(true);
  }, [productsOrder, products, total]);

  const formatarMoeda = (num) => {
    let moeda = String(num);
    moeda = moeda.replace('.', ',');
    return `R$ ${moeda}`;
  };

  return (
    <div>
      <NavbarSeller />
      <h2>Detalhes do Pedido</h2>
      <span
        data-testId="seller_order_details__element-order-details-label-order-id"
      >
        {` Pedido ${id} `}
      </span>
      <span
        data-testId="seller_order_details__element-order-details-label-order-date"
      >
        { formarData(orderId.saleDate) }
      </span>
      <span
        data-testId="seller_order_details__element-order-details-label-delivery-status"
      >
        { status }
      </span>
      <button
        type="button"
        data-testId="seller_order_details__button-preparing-check"
        disabled={ preparando }
        onClick={ () => statusPedido('Preparando') }
      >
        Preparar Pedido
      </button>
      <button
        type="button"
        data-testId="seller_order_details__button-dispatch-check"
        disabled={ transito }
        onClick={ () => statusPedido('Em Trânsito') }
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
        TOTAL
        { ' ' }
        <span>{formatarMoeda(total.toFixed(2))}</span>
      </div>
    </div>
  );
}

export default SellerOrdersDetails;
