import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [
        ...this.state.list,
        { code: generateCode(), title: 'Новая запись' },
      ],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      list: this.state.list.filter((item) => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map((item) => {
        if (item.code === code) {
          // Смена выделения и подсчёт
          return {
            ...item,
            selected: !item.selected,
            count: item.selected ? item.count : item.count + 1 || 1,
          };
        }
        // Сброс выделения если выделена
        return item.selected ? { ...item, selected: false } : item;
      }),
    });
  }

  /**
     * Добавление товара по коду
     * @param code
     */
  addToOrder(code) {
    const existingItem = this.state.order.find((item) => item.code === code)
    if (existingItem) {
      this.setState({
        ...this.state,
        order: this.state.order.map((item) => {
          if (item.code === code) {
            return { ...item, count: item.count + 1 };
          }
          return item;
        }),
      });
    } else {
      const item = this.state.list.find((item) => item.code === code);
      this.setState({
        ...this.state,
        order: [
          ...this.state.order,
          {
            ...item,
            count: 1,
          },
        ],
      });
    }
  }

  /**
   * Удаление товара по коду
   * @param code
   */

  deleteOrder(code) {
    this.setState({
      ...this.state,
      order: this.state.order.filter((item) => item.code !== code),
    });
  }
}

export default Store;
