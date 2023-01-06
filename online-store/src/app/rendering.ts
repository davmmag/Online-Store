import { createElement, uniqueArray, createCheckbox} from "../functions/functions";
import { productsArray } from "../app/products";
import { ProductDescription } from "../types/types";
import { filtersObj } from "./app"

function start(): void {
    /*Создание блока с фильтрами и заголовка сортировки*/
    createElement("div", "main__container", "main__filters");
        createElement("div", "main__filters", "filters__title", "Фильтры");
        createElement("div", "main__filters", "filters__content");
            createElement("div", "filters__content", "filter-title", "Фильтр по ценам:");
            createElement("div", "filters__content", "slider");
            createElement("div", "slider", "range-slider");
              createElement("div", "range-slider", "range-slider__wrapper");
                createElement("div", "range-slider__wrapper", "rangeValuesMin");
                createElement("div", "range-slider__wrapper", "MinMax", "-");
                createElement("div", "range-slider__wrapper", "rangeValuesMax");
            createElement("input", "range-slider", "slider-input slider-input_min");
                let inputMin = document.querySelector('.slider-input_min') as HTMLInputElement;
                if (inputMin) {
                    inputMin.value = `${filtersObj.price[0]}`;
                    inputMin.min = `${filtersObj.price[0]}`;
                    inputMin.max = `${filtersObj.price[1]}`;
                    inputMin.type = 'range';
                }
            createElement("input", "range-slider", "slider-input slider-input_max");
                let inputMax = document.querySelector('.slider-input_max') as HTMLInputElement;
                if (inputMax) {
                    inputMax.value = `${filtersObj.price[1]}`;
                    inputMax.min = `${filtersObj.price[0]}`;
                    inputMax.max = `${filtersObj.price[1]}`;
                    inputMax.type = 'range';
                }
            createElement("div", "filters__content", "filter-title", "Фильтр по рейтингу:");

          


    createElement("div", "main__container", "main__table");
        createElement("div", "main__table", "table__toolbar");
            createElement("div", "table__toolbar", "sort-by", "Сортировать по: ");
                createElement("select", "sort-by", "select-box");
                const selectBox = document.querySelector(`.select-box`);
                    let option = document.createElement(`option`);
                    option.value = "priceAscending";
                    option.innerText = "Цена по возрастанию";
                    selectBox?.appendChild(option);

                    option = document.createElement(`option`);
                    option.value = "priceDescending";
                    option.innerText = "Цена по убыванию";
                    selectBox?.appendChild(option);

                    option = document.createElement(`option`);
                    option.value = "sizeAscending";
                    option.innerText = "Рейтинг по возрастанию";
                    selectBox?.appendChild(option);

                    option = document.createElement(`option`);
                    option.value = "sizeDescending";
                    option.innerText = "Рейтинг по убыванию";
                    selectBox?.appendChild(option);

                createElement("div", "table__toolbar", "view-mode");
                    createElement("div", "view-mode", "view-mode-btn view-mode__table");
                    createElement("div", "view-mode", "view-mode-btn view-mode__list");              
}
    
function renderCheckbox () {
    createElement("div", "filters__content", "checkboxes-wrapper");

        createElement("div", "checkboxes-wrapper", "filters-country filter-checkbox");
        createElement("div", "filters-country", "filter-title", "Страна:");
        createElement ("form", "filters-country", "checkboxes-country" );
            uniqueArray(productsArray, "country").forEach (element => {
                createCheckbox (`${element}`, "checkboxes-country", "country");

            });
        
        createElement("div", "checkboxes-wrapper", "filters-brand filter-checkbox");
            createElement("div", "filters-brand", "filter-title", "Производитель:");
            createElement("ul", "filters-brand", "filters-brand__menu checkbox__menu");
            createElement ("form", "filters-brand", "checkboxes-brand" ); 
            uniqueArray(productsArray, "brand").forEach (element => {
                createCheckbox (`${element}`, "checkboxes-brand", "brand");
            });
        
            createElement("div", "checkboxes-wrapper", "filters-buttons filters-reset", "Сбросить фильтры");
            createElement("div", "checkboxes-wrapper", "filters-buttons filters-save", "Сохранить фильтры"); 
}   

function createTable (array: ProductDescription[]) {
    /*Создание таблицы с товарами*/
    document.querySelector('.table__products')?.remove();
        createElement("div", "main__table", "table__products");
            for (let i: number = 0; i < array.length; i++) {
                const elParent = document.querySelector(`.table__products`);
                if (elParent !== null) {
                    const elem = document.createElement(`div`);
                    elem.className = `product-item`;
                    elParent.append(elem);
                        const img = document.createElement(`img`);
                        img.className = `product-image`;
                        img.src = `${array[i].thumbnail}`;
                        elem.append(img);
                        const productShop = document.createElement(`div`);
                        productShop.className = `product-shop`;
                        elem.append(productShop);
                            let a = document.createElement(`a`);
                            a.className = `product-name`;
                            a.target = "_blank";
                            a.href = "goods.html";
                            a.innerHTML = `${array[i].title}`;
                            productShop.append(a);
                            let div = document.createElement(`div`);
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

export { start, createTable, renderCheckbox }