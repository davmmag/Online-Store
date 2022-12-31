import { Console } from "console";
import { createElement, uniqueArray, createCheckbox, searchFunction, sortingArray } from "../app/functions";
import { productsArray } from "../app/products";
import { ProductDescription, ProductFilters } from "./types";


let checkedArray: ProductFilters[] = [];
let arrayCountry: string [] = [];
let arrayBrand: string [] = [];
let filteredArray = productsArray;
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
                        inputMin.value = '1000';
                        inputMin.min = '1000';
                        inputMin.max = '5000';
                        inputMin.type = 'range';
                    }
                createElement("input", "range-slider", "slider-input slider-input_max");
                    let inputMax = document.querySelector('.slider-input_max') as HTMLInputElement;
                    if (inputMax) {
                        inputMax.value = '5000';
                        inputMax.min = '1000';
                        inputMax.max = '5000';
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


function checked () {
    const clickFilters = document.querySelector('.filters-prime');
        let checkboxes: NodeListOf<Element> = document.querySelectorAll('input[type=checkbox]');
        for (let i= 0; i < checkboxes.length; i++) {
            checkboxes[i].addEventListener('change', function(event) {
                if (event.target instanceof HTMLInputElement) {
                    if (event.target.checked) {
                        if (event.target.offsetParent?.className === "checkboxes-country") {
                            arrayCountry.push(`${event.target.value}`);
                            filteredArray = productsArray.filter(elem => arrayCountry.includes(elem.country))
                            createTable(filteredArray);
                        }         
                        if (event.target.offsetParent?.className === "checkboxes-brand") {
                            arrayBrand.push(`${event.target.value}`);
                            filteredArray = filteredArray.filter(elem => arrayBrand.includes(elem.brand))
                            createTable(filteredArray);
                        }

                        if (clickFilters) {
                            clickFilters.classList.add('active');
                        }
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

function filtered () {
    const clickFilters = document.querySelector('.filters-prime');
    let newArr: ProductDescription[] = [];
        if (clickFilters) {
            clickFilters.addEventListener('click', () => {

                document.querySelector('.table__products')?.remove();
                createTable(newArr);
            })
        }        
}

function sortered () {
    let sortingValue: string = 'priceAscending';
    createTable(sortingArray (productsArray, sortingValue));
    const selectSort = document.querySelector('.select-box') as HTMLInputElement;
    if (selectSort) {
        selectSort.onchange = function() {
            sortingValue = selectSort.value;
            
            createTable(sortingArray (productsArray, sortingValue));
        };
    }
}

function search() {
    let submitForm = document.querySelector('.header-searchbutton');
    let inputText = document.querySelector('.search-text') as HTMLInputElement;

    submitForm?.addEventListener('click', e => {
        if (inputText) {
            e.preventDefault();
            createTable(searchFunction (productsArray, inputText.value));
        }
    })
}

export { start, createTable, checked, filtered, sortered, search };