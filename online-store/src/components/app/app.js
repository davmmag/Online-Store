
function createElement (type, parent, children, text) {
    const elParent = document.querySelector(`.${parent}`);
    if (elParent !== null) {
        const elem = document.createElement(`${type}`);
        elem.className = `${children}`;
        if (text !== undefined) {
            elem.innerHTML = `${text}`;
        }
        elParent.append(elem);
    }
}
class App {

    constructor() {
    }

    start() {
        createElement("div", "main__container", "main__filters");
            createElement("div", "main__filters", "filters__title", "Фильтры");
            createElement("div", "main__filters", "filters__content");
                createElement("div", "filters__content", "filters-price", "Фильтр по ценам:");
                createElement("div", "filters__content", "filters-price", "Фильтр по размеру:");
                createElement("div", "filters__content", "filters-price", "Страна:");

                createElement("div", "filters__content", "filters-price", "Производитель:");
                createElement("div", "filters__content", "filters-price", "Ректификат:");

        createElement("div", "main__container", "main__table");
    }
}

export default App;