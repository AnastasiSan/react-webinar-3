import React from 'react';
import './style.css';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import List from '../list';

function Order({
  order,
  onDeleteOrder,
  buttonTitle,
  totalPrice
}) {
  const cn = bem('Order');
  return (
    <div className={cn()} >
        
        <div className={cn('info')}>
          <List
            list={order}
            onClick={onDeleteOrder}
            buttonTitle={buttonTitle}
          />
        </div>
        <div className={cn('totalPrice')}>
          Итого <span>{totalPrice.price} ₽</span>
        </div>
    </div>
  );
}

Order.propTypes = {
  order: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  buttonTitle: PropTypes.string,
  setIsOpenModal: PropTypes.func,
  onDeleteOrderItem: PropTypes.func,
};

Order.defaultProps = {
  onDeleteOrderItem: () => { },
  setIsOpenModal: () => { },
};

export default React.memo(Order);
