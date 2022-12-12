class Section {
  // Первым параметром конструктор принимает объект renderer, второй параметр — селектор контейнера
  constructor({ renderer }, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }
  // Метод отрисовки всех элементов
  renderItems(res) {
    res.forEach(this._renderer);
  }
  // Метод принимает DOM-элемент и добавляет его в контейнер
  addItem(cardElement) {
    this._container.prepend(cardElement);
  }
}
// Экспортируем класс в index.js
export { Section };