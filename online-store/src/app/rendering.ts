import { createElement, uniqueArray, createCheckbox} from "../app/functions";
import { productsArray } from "../app/products";
import { ProductDescription } from "./types";
import { filtersObj } from "./slider"

function start(): void {
    /*Создание блока с фильтрами и заголовка сортировки*/
    createElement("div", "main__container", "main__filters");
        createElement("div", "main__filters", "filters__title", "Фильтры");
        createElement("div", "main__filters", "filters__content");
            createElement("div", "filters__content", "filters-price", "Фильтр по ценам:");
            createElement("div", "filters-price", "slider");
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
            createElement("div", "filters__content", "filters-size", "Фильтр по рейтингу:");
            
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

            createElement("div", "filters__content", "filters-prime", "Сбросить фильтры");

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
                            let div = document.createElement(`div`);
                            div.className = `product-name`;
                            div.innerHTML = `${array[i].title}`;
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

export { start, createTable }