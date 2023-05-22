import React from 'react';
import './style.css';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Head from '../head';

function Modal({
  title,
  setIsOpenModal,
  children
}) {
  const cn = bem('Modal');
  return (
    <div className={cn()}>
      <div className={cn('container')}>
        <Head title={title}>
          <button
            onClick={() => {
              setIsOpenModal(false);
            }}
          >
            Закрыть
          </button>
        </Head>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  isOpenModal: PropTypes.bool,
  children: PropTypes.node,
  title: PropTypes.string,
  setIsOpenModal: PropTypes.func,
};

Modal.defaultProps = {
  setIsOpenModal: () => { },
};


export default React.memo(Modal);
