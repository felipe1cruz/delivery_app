import React, { useContext, useEffect, useState } from 'react';
import Context from '../context/Context';

const testIdItemNumber = 'customer_order_details__element-order-table-item-number-';
const testIdTableName = 'customer_order_details__element-order-table-name-';
const testIdTableQnt = 'customer_order_details__element-order-table-quantity-';
const testIdTableUnitPrice = 'ustomer_order_details__element-order-table-unit-price-';
const testIdTableSubTotal = 'customer_order_details__element-order-table-sub-total-';
const testIdTotal = 'customer_order_details__element-order-total-price';

function OrdersList() {
  const { ordersList } = useContext(Context);
  const [totalPrice, setTotalPrice] = useState(0);

  const roundValue = (value) => {
    const newValue = Math.round((value) * 100) / 100;
    return newValue.toFixed(2);
  };

  const totalPriceCount = () => {
    const sum = ordersList.reduce((acc, ele) => {
      acc += ele.qtds * ele.price;
      return acc;
    }, 0);
    setTotalPrice(roundValue(sum));
    return sum;
  };

  useEffect(() => {
    if (ordersList.length !== 0) {
      totalPriceCount();
    }
  }, [ordersList]);

  const currencyBrl = (value) => {
    const stringValue = `R$ ${value}`;
    const brlValue = stringValue.replace('.', ',');
    return brlValue;
  };

  const tableCollumns = () => (
    <tr>
      <th>Item</th>
      <th>Descrição</th>
      <th>Quantidade</th>
      <th>Valor Unitário</th>
      <th>Sub-total</th>
    </tr>
  );

  const tableRow = () => (
    ordersList.map((ma, index) => (
      <tr key={ index } style={ { margin: '10px' } }>
        { console.log(index) }
        <td data-testid={ `${testIdItemNumber}${index}` }>{ index + 1 }</td>
        <td data-testid={ `${testIdTableName}${index}` }>{ ma.name }</td>
        <td data-testid={ `${testIdTableQnt}${index}` }>{ ma.qtds }</td>
        <td
          data-testid={ `${testIdTableUnitPrice}${index}` }
        >
          { currencyBrl(roundValue(ma.price)) }
        </td>
        <td
          data-testid={ `${testIdTableSubTotal}${index}` }
        >
          { currencyBrl(roundValue(ma.price * ma.qtds)) }
        </td>
      </tr>
    ))
  );

  return (
    <div>
      <table>
        <thead>
          { tableCollumns() }
        </thead>
        <tbody>
          { tableRow() }
        </tbody>
      </table>
      <div data-testid={ testIdTotal }>
        <br />
        { `Total: ${currencyBrl(totalPrice)}` }
      </div>
    </div>
  );
}

export default OrdersList;
