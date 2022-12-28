import { createElement, uniqueArray, createCheckbox, removeArrEl, filteredArray, sortingArray } from "../app/functions";
import { productsArray } from "../app/products";
import { ProductDescription, ProductFilters } from "./types";


let checkedArray: ProductFilters[] = [];
function start(): void {
        /*Создание блока с фильтрами и заголовка сортировки*/
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


function checked () {
    const clickFilters = document.querySelector('.filters-prime');
        let checkboxes: NodeListOf<Element> = document.querySelectorAll('input[type=checkbox]');
        for (let i= 0; i < checkboxes.length; i++) {
            checkboxes[i].addEventListener('change', function(event) {
                if (event.target instanceof HTMLInputElement) {
                    if (event.target.checked) {
                        if (event.target.offsetParent?.className === "checkboxes-country"){
                            checkedArray.push({country: `${event.target.value}`});
                        }         
                        if (event.target.offsetParent?.className === "checkboxes-brand"){
                            checkedArray.push({brand: `${event.target.value}`});
                        } 
                        if (clickFilters) {
                            clickFilters.classList.add('active');
                        }
                        console.log (checkedArray);
                    } else {
                        if (event.target.offsetParent?.className === "checkboxes-country"){
                            checkedArray.push({country: `${event.target.value}`});
                        } 
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
/*
function filtered () {
    const clickFilters = document.querySelector('.filters-prime');
    let newArr: ProductDescription[] = [];
        if (clickFilters) {
            clickFilters.addEventListener('click', () => {
                newArr = filteredArray (checkedArray);                  
                document.querySelector('.table__products')?.remove();
                createTable(newArr);
            })
        }        
}
*/
function sortered () {
    let sortingValue: string = 'priceAscending';
    createTable(sortingArray (productsArray, sortingValue));
    const selectSort = document.querySelector('.select-box');

    if (!(selectSort instanceof HTMLInputElement)) {
        throw new Error('newsClone is not HTMLElement');
    }

    if (selectSort) {
        selectSort.onchange = function() {
            sortingValue = selectSort.value;
            document.querySelector('.table__products')?.remove();
            createTable(sortingArray (productsArray, sortingValue));
        };
    }
}

export { start, createTable, checked, /*filtered,*/ sortered };