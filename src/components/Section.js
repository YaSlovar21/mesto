export default class Section {

    constructor({data, renderer}, cardlistSelector) {
        this._renderedItems = data;
        this._container = document.querySelector(cardlistSelector);
        this._renderer = renderer;
    }
     
    setItem(element) {
        this._container.prepend(element);
    }

    renderItems(items) {
        //this._renderedItems.reverse().forEach(item => {
        //    this._renderer(item);
        //});
        items.reverse().forEach(item => {
               this._renderer(item);
        });
    }
}