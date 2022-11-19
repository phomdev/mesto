class Section {
  // Первым параметром конструктор принимает объект с двумя свойствами: items и renderer, второй параметр — селектор контейнера
  constructor({ items, renderer }, templateElem) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._templateContainer = document.querySelector(templateElem);
  }
  // Метод отрисовки всех элементов
  renderItems() {
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }
  // Метод принимает DOM-элемент и добавляет его в контейнер
  addItem(cardElement) {
    this._templateContainer.prepend(cardElement);
  }
}

export { Section };