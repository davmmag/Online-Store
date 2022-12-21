import { createElement, uniqueArray } from "../app/functions";
import { productsArray } from "../app/products";
class App {

    constructor() {
    }

    start() {
        createElement("div", "main__container", "main__filters");
            createElement("div", "main__filters", "filters__title", "Фильтры");
            createElement("div", "main__filters", "filters__content");
                createElement("div", "filters__content", "filters-price", "Фильтр по ценам:");
                createElement("div", "filters__content", "filters-size", "Фильтр по размеру:");
                
                createElement("div", "filters__content", "filters-country filter-checkbox");
                    createElement("div", "filters-country", "filters-country__title checkbox__title", "Страна:");
                    createElement("ul", "filters-country", "filters-country__menu checkbox__menu");
                        uniqueArray(productsArray, "country").forEach (element => {

                            createElement("li", "filters-country__menu", "filters-country__item", `${element}`);
                        });
                    
                createElement("div", "filters__content", "filters-brand filter-checkbox");
                    createElement("div", "filters-brand", "filters-brand__title checkbox__title", "Производитель:");
                    createElement("ul", "filters-brand", "filters-brand__menu checkbox__menu");
                        uniqueArray(productsArray, "brand").forEach (element => {
                            createElement("li", "filters-brand__menu", "filters-brand__item", `${element}`);
                        });
                    
                createElement("div", "filters__content", "filters-rectified filter-checkbox", );
                    createElement("div", "filters-rectified", "filters-rectified__title checkbox__title", "Ректификат:");
                    createElement("ul", "filters-rectified", "filters-rectified__menu checkbox__menu");
                        createElement("li", "filters-rectified__menu", "filters-rectified__item", `Да`);
                        createElement("li", "filters-rectified__menu", "filters-rectified__item", `Нет`);

        createElement("div", "main__container", "main__table");
    }

    filter () {
        const filterCheckbox = document.querySelector('.filter-checkbox');
        const checkboxMenu = document.querySelector('.checkbox__menu');
        if (filterCheckbox) {
            filterCheckbox.addEventListener('click', () => {
                console.log ("click");
                if (checkboxMenu) {
                    checkboxMenu.classList.toggle('active');
                }
            })
        }
        
    }
}

export default App;