import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { requestLogin } from '../services/requests';

function CustomerProducts() {
  const testIdTotal = 'customer_checkout__element-order-total-price';
  const testIdSellerSelect = 'customer_checkout__select-seller';
  const testIdCustomerAdress = 'customer_checkout__input-address';
  const testIdCustomerAdressNum = 'customer_checkout__input-address-number';
  const testIdSubmitButton = 'customer_checkout__button-submit-order';
  const history = useHistory();

  const dataTests = (index) => {
    const cardOrder = `customer_checkout__element-order-table-item-number-${index}`;
    const cardDescription = `customer_checkout__element-order-table-name-${index}`;
    const cardQuantity = `customer_checkout__element-order-table-quantity-${index}`;
    const cardPrice = `customer_checkout__element-order-table-unit-price-${index}`;
    const cardSubtotal = `customer_checkout__element-order-table-sub-total-${index}`;
    const cardRmItem = `customer_checkout__element-order-table-remove-${index}`;
    return {
      cardOrder,
      cardDescription,
      cardQuantity,
      cardPrice,
      cardSubtotal,
      cardRmItem,
    };
  };

  const [userId, setUserId] = useState('');
  const [sellerId, setSellerId] = useState(0);
  const [sellers, setSellers] = useState([]);
  const [totalPrice, setTotalPrice] = useState('');
  const [deliveryAddress, setdeliveryAddress] = useState('');
  const [deliveryNumber, setdeliveryNumber] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setSellers([{ id: 1, name: 'joao' }, { id: 2, name: 'maria' }]);
    const user = JSON.parse(localStorage.getItem('user'));
    setUserId(user.id);
    setProducts([
      { name: 'skol', qde: 1, price: 3.50 },
      { name: 'brahma', qde: 2, price: 3.50 },
      { name: 'sol', qde: 7, price: 1.00 }]);
    setTotalPrice(products.reduce((acc, curr) => acc + curr.qde * curr.price, 0));
  }, []);

  useEffect(() => {
  }, products);

  const handleChange = (target) => {
    const { id, value } = target;
    console.log(value);
    if (id === 'deliveryAddress') setdeliveryAddress(value);
    if (id === 'deliveryNumber') setdeliveryNumber(value);
    if (id === 'sellerId') setSellerId(value);
  };

  const submitButton = () => {
    const data = requestLogin('/customer/checkout', {
      userId,
      sellerId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      saleDate: '2023-01-26 - 14:15:58',
      status: 'Pendente',
    });
    history.push(`/customer/orders/${data.id}`);
  };

  const rmButton = (name) => {
    console.log(name);
    setProducts(products.filter((product) => product.name !== name));
  };

  return (
    <div>
      <Navbar />
      {products.map((product, index) => (
        <div
          key={ index }
          style={ {
            border: 'solid 1px #ccc',
            margin: '5px',
            padding: '5px' } }
        >
          <div
            data-testid={ dataTests(index).cardOrder }
          >
            {index + 1}
          </div>
          <div
            data-testid={ dataTests(index).cardDescription }
          >
            {product.name}
          </div>
          <div
            data-testid={ dataTests(index).cardQuantity }
          >
            {product.qde}
          </div>
          <div
            data-testid={ dataTests(index).cardPrice }
          >
            {product.price}
          </div>
          <div
            data-testid={ dataTests(index).cardSubtotal }
          >
            {product.price * product.qde}
          </div>
          <button
            type="button"
            data-testid={ dataTests(index).cardRmItem }
            name={ product.name }
            onClick={ (e) => rmButton(e.target.name) }
          >
            Remover
          </button>
        </div>
      ))}
      <div data-testid={ testIdTotal }>{`Total: ${totalPrice}`}</div>
      <p>P. Vendedora Responsável</p>
      <select
        data-testid={ testIdSellerSelect }
        value={ sellerId }
        onChange={ (e) => setSellerId(e.target.value) }
      >
        {sellers.map((seller, i) => (
          <option
            value={ seller.id }
            key={ i }
            id="sellerId"
          >
            {seller.name}
          </option>))}
      </select>
      <input
        type="text"
        placeholder="Digite seu endereço"
        data-testid={ testIdCustomerAdress }
        onChange={ (e) => setdeliveryAddress(e.target.value) }
      />
      <input
        type="number"
        placeholder="número"
        data-testid={ testIdCustomerAdressNum }
        onChange={ (e) => handleChange(e.target) }
      />
      <button
        type="submit"
        data-testid={ testIdSubmitButton }
        onClick={ () => submitButton() }
      >
        Finalizar Pedido

      </button>
    </div>
  );
}

export default CustomerProducts;