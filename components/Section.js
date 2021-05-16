export default class Section {
    constructor({initialcards, renderer}, cardlistSelector) {
        this._renderedItems = initialcards;
        this._container = document.querySelector(cardlistSelector);
        this._renderer = renderer;
    }
     
    setItem(element) {
        this._container.prepend(element);
    }

    renderItems() {
        this._renderedItems.forEach(element => {
            this._renderer(item);
        });
    }
}