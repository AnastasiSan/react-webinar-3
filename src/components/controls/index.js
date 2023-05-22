import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { plural } from '../../utils';

function Controls({ totalPrice,setIsOpenModal }) {
  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <div className={cn('order')}>
        В корзине:
        <span className={cn('total')}>
        {totalPrice.count
            ? `${totalPrice.count} ${plural(totalPrice.count, {
                one: 'товар',
                few: 'товара',
                many: 'товаров',
              })} / ${totalPrice.price} ₽`
            : 'пусто'}
        </span>
      </div>
      <button
        onClick={() => {
          setIsOpenModal(true);
        }}
      >
        Перейти
      </button>
    </div>
  );
}

Controls.propTypes = {
  order: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  setIsOpenModal: PropTypes.func,
};

Controls.defaultProps = {
  setIsOpenModal: () => { },
};

export default React.memo(Controls);
