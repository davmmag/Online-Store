import { searchFunction, sortingArray } from "../app/functions";
import { productsArray } from "../app/products";
import { ProductDescription } from "./types";
import { createTable } from "../app/rendering";
import { filtersObj } from "../app/slider"

let countryArray: string [] = [];
let brandArray: string [] = [];

function checked () {
    const clickFilters = document.querySelector('.filters-prime');
    let checkboxes: NodeListOf<Element> = document.querySelectorAll('input[type=checkbox]');
    for (let i= 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener('change', function(event) {
            if (event.target instanceof HTMLInputElement) {
                if (event.target.checked) {
                    if (event.target.offsetParent?.className === "checkboxes-country") {                           
                        countryArray.push(`${event.target.value}`) ;
                        filtersObj.country = countryArray;
                        filtered () 
                    }         
                    if (event.target.offsetParent?.className === "checkboxes-brand") {
                        brandArray.push(`${event.target.value}`);
                        filtersObj.brand = brandArray;
                        filtered ()
                    }
                    if (clickFilters) {
                        clickFilters.classList.add('active');
                    }
                } else {
                    if (event.target.offsetParent?.className === "checkboxes-country") {
                        let deleteCountry = `${event.target.value}`;
                        countryArray = countryArray.filter((name) => name !== deleteCountry);
                        filtersObj.country = countryArray;
                        filtered ()
                    }         
                    if (event.target.offsetParent?.className === "checkboxes-brand") {
                        let deleteBrand = `${event.target.value}`;
                        brandArray = brandArray.filter((name) => name !== deleteBrand);
                        filtersObj.brand = brandArray;
                        filtered ()
                    }
                }
            }
        });
    }
}


function filtered () {
    let newArr: ProductDescription[] = productsArray;
    if (filtersObj.country?.length) {
        newArr = newArr.filter(el => filtersObj.country?.includes(el.country));
    }
    if (filtersObj.brand?.length) {
        newArr = newArr.filter(el => filtersObj.brand?.includes(el.brand));
    }
    if (filtersObj.price.length) {
        newArr = newArr.filter(el => el.price >= filtersObj.price[0]);
    }
    if (filtersObj.price.length) {
        newArr = newArr.filter(el => el.price <= filtersObj.price[1]);
    }
    createTable(newArr);
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

export { checked, filtered, sortered, search, filtersObj };