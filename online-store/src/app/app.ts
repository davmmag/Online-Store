import { createElement, uniqueArray, createCheckbox } from "../app/functions";
import { productsArray } from "../app/products";
import { ProductDescription } from "./types";
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
                    createElement("ul", "filters-country", "filters-country__menu checkbox__menu");
                        uniqueArray(productsArray, "country").forEach (element => {
                            createElement("li", "filters-country__menu", "filters-country__item");
                            createCheckbox (`${element}`, "filters-country__item");
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