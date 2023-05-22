import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Order from './components/order';
import './style.css'
import Modal from './components/modal';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const list = store.getState().list;
  const order = store.getState().order;
  const totalPrice = store.getState().totalPrice

  const callbacks = {
    onAddToOrder: useCallback(
      (code) => {
        store.addToOrder(code);
      },
      [store]
    ),

    onDeleteOrder: useCallback(
      (code) => {
        store.deleteOrder(code);
      },
      [store]
    ),
  };

  return (
    <PageLayout>
      <Head title='Магазин' />
      <Controls totalPrice={totalPrice} order={order} setIsOpenModal={setIsOpenModal} />
      <List
        buttonTitle={'Добавить'}
        list={list}
        onClick={callbacks.onAddToOrder}
      />
      {isOpenModal && (
        <Modal title='Корзина' setIsOpenModal={setIsOpenModal}>
        <Order
          buttonTitle={'Удалить'}
          order={order}
          onDeleteOrder={callbacks.onDeleteOrder}
          totalPrice={totalPrice}
        />
      </Modal>
      )}
    </PageLayout>
  );
}

export default App;
