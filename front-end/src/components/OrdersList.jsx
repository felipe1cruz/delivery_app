import React, { useContext } from 'react';
import Context from '../context/Context';

function OrdersList() {
  const { ordersList } = useContext(Context);

  return (
    ordersList.map((ma, index) => (
      <div key={ index } style={ { margin: '10px' } }>
        <span>
          { ' ' }
          { index + 1 }
        </span>
        <span>
          { ' - ' }
          { ma.name }
        </span>
        <span>
          { ' - ' }
          { ma.qtds }
        </span>
        <span>
          { ' - ' }
          { ma.price }
        </span>
        <span>
          { ' - ' }
          { ma.price * ma.qtds }
        </span>
      </div>
    ))
  );
}

export default OrdersList;
