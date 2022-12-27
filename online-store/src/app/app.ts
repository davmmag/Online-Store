import { createElement, uniqueArray, createCheckbox, removeArrEl } from "../app/functions";
import { productsArray } from "../app/products";
import { ProductDescription} from "./types";

let checkedArray: string[] = [];


class App {
    start() {
        /*Создание блока с фильтрами*/
        createElement("div", "main__container", "main__filters");
            createElement("div", "main__filters", "filters__title", "Фильтры");
            createElement("div", "main__filters", "filters__content");
                createElement("div", "filters__content", "filters-price", "Фильтр по ценам:");
                createElement("div", "filters__content", "filters-size", "Фильтр по размеру:");
                
                createElement("div", "filters__content", "filters-country filter-checkbox");
                    createElement("div", "filters-country", "filters-country__title checkbox__title", "Страна:");
                    createElement ("form", "filters-country", "checkboxes-country" );
                        uniqueArray(productsArray, "country").forEach (element => {
                            createCheckbox (`${element}`, "checkboxes-country");
                        });
                    
                createElement("div", "filters__content", "filters-brand filter-checkbox");
                    createElement("div", "filters-brand", "filters-brand__title checkbox__title", "Производитель:");
                    createElement("ul", "filters-brand", "filters-brand__menu checkbox__menu");
                    createElement ("form", "filters-brand", "checkboxes-brand" );
                    uniqueArray(productsArray, "brand").forEach (element => {
                        createCheckbox (`${element}`, "checkboxes-brand");
                    });
                    
                createElement("div", "filters__content", "filters-rectified filter-checkbox", );
                    createElement("div", "filters-rectified", "filters-rectified__title checkbox__title", "Ректификат:");

                createElement("div", "filters__content", "filters-prime", "Применить фильтры");
                        
    }
        
    createTable (array: ProductDescription[]) {
        /*Создание таблицы с товарами*/
        createElement("div", "main__container", "main__table");
            createElement("div", "main__table", "table__toolbar");
            createElement("div", "main__table", "table__products");
                for (let i: number = 0; i < array.length; i++) {
                    const elParent = document.querySelector(`.table__products`);
                    if (elParent !== null) {
                        const elem = document.createElement(`div`);
                        elem.className = `product-item`;
                        elParent.append(elem);
                            const img = document.createElement(`img`);
                            img.className = `product-image`;
                            img.src = `${array[i].picture.onepicture}`;
                            elem.append(img);
                            const productShop = document.createElement(`div`);
                            productShop.className = `product-shop`;
                            elem.append(productShop);
                                let div = document.createElement(`div`);
                                div.className = `product-name`;
                                div.innerHTML = `${array[i].name}`;
                                productShop.append(div);
                                div = document.createElement(`div`);
                                div.className = `product-price`;
                                div.innerHTML = `${array[i].price}`;
                                productShop.append(div);
                                div = document.createElement(`div`);
                                div.className = `product-button`;
                                div.innerHTML = "Добавить в корзину"
                                productShop.append(div);
                    }
            }
    }


    checked () {
        let checkboxes: NodeListOf<Element> = document.querySelectorAll('input[type=checkbox]');
        const clickFilters = document.querySelector('.filters-prime');
        for (let i= 0; i < checkboxes.length; i++) {
            checkboxes[i].addEventListener('change', function(event) {
                if (event.target instanceof HTMLInputElement) {
                    if (event.target.checked) {                       
                        checkedArray.push(`${event.target.value}`);
                        if (clickFilters) {
                            clickFilters.classList.add('active');
                        }
                    } else {
                        checkedArray = removeArrEl (checkedArray, `${event.target.value}`);
                        if (checkedArray.length === 0) {
                            if (clickFilters) {
                                clickFilters.classList.remove('active');
                            }
                        }
                    }
                }
            });
        }
    }

    filtered () {
        const clickFilters = document.querySelector('.filters-prime');
        if (clickFilters) {
            clickFilters.addEventListener('click', () => {
                for (let i: number = 0; i < checkedArray.length; i++) {
                    
                }
            })
        }
        
    }
}

export default App;