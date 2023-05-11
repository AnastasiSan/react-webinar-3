import { generateId } from "./utils";

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
        { title: "Новая запись", id: generateId(), clicked: 0 },
      ],
    });
  }

  /**
   * Удаление записи по коду
   * @param id
   */
  deleteItem(id) {
    this.setState({
      ...this.state,
      list: this.state.list.filter((item) => item.id !== id),
    });
  }

  /**
   * Выделение записи по коду
   * @param id
   * @param clicked
   */
  selectItem(id) {
    this.setState({
      ...this.state,
      list: this.state.list.map((item) => {
        if (item.id === id) {
          item.selected = !item.selected;
          item.clicked = item.clicked + 1;
        } else {
          item.selected = false;
        }
        return item;
      }),
    });
  }
}

export default Store;
