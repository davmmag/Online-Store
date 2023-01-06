import { searchFunction, sortingArray, changeCheckbox } from "../functions/functions";
import { productsArray } from "../app/products";
import { ProductDescription } from "../types/types";
import { createTable, renderCheckbox } from "../app/rendering";
import { filtersObj, slider } from "../app/slider"

let countryArray: string [] = [];
let brandArray: string [] = [];
let sortArray = productsArray;
let sortingValue: string = 'priceAscending';

function checked () {
    const clickFilters = document.querySelector('.filters-prime');
    let checkboxes: NodeListOf<Element> = document.querySelectorAll('.checkbox-input');
    
    for (let i= 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener('change', function(event) {
            
            if (event.target instanceof HTMLInputElement) {
                if (event.target.checked) {

                    if (event.target.form?.className === "checkboxes-country") {                           
                        countryArray.push(`${event.target.value}`) ;                      
                        filtersObj.country = countryArray;
                        filtered();
                        slider(filtered());
                    }         
                    if (event.target.form?.className === "checkboxes-brand") {
                        brandArray.push(`${event.target.value}`);
                        filtersObj.brand = brandArray;
                        filtered();
                        slider(filtered());
                        
                    }
                    if (clickFilters) {
                        clickFilters.classList.add('active');
                    }
                } else {
                    if (event.target.form?.className === "checkboxes-country") {
                        let deleteCountry = `${event.target.value}`;
                        countryArray = countryArray.filter((name) => name !== deleteCountry);
                        filtersObj.country = countryArray;
                        filtered();
                        slider(filtered());
                        
                    }         
                    if (event.target.form?.className === "checkboxes-brand") {
                        let deleteBrand = `${event.target.value}`;
                        brandArray = brandArray.filter((name) => name !== deleteBrand);
                        filtersObj.brand = brandArray;
                        filtered();
                        slider(filtered());
                        
                    }
                }
            }
        });
    }
}

function filtered () {
    let newArr: ProductDescription[] = sortArray;
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

    function sortered () {
        createTable(sortingArray (newArr, sortingValue));
        const selectSort = document.querySelector('.select-box') as HTMLInputElement;
        if (selectSort) {
            selectSort.onchange = function() {
                sortingValue = selectSort.value;
                createTable(sortingArray (newArr, sortingValue));
            };
        }
    }
    sortered ();
    return newArr;
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

function viewDisplay(view: string){
    if (view === 'table') {
        document.querySelector('.view-mode__table')?.classList.add ('view-active');
        const productItem: NodeListOf<Element> = document.querySelectorAll('.product-item');
        productItem.forEach (elem => {
            if (elem instanceof HTMLDivElement) {
                elem.style.flexDirection = 'column';
                elem.style.width = '33.333%';
            }
            if (elem.childNodes[1].childNodes[2] instanceof HTMLDivElement) { 
                elem.childNodes[1].childNodes[2].style.width = '100%';                  
            }
        })
    }
    if (view === 'list') {
        document.querySelector('.view-mode__list')?.classList.add ('view-active');
        const productItem: NodeListOf<Element> = document.querySelectorAll('.product-item');
        productItem.forEach (elem => {
            if (elem instanceof HTMLDivElement) {
                elem.style.flexDirection = 'row';
                elem.style.width = '100%';
                if (elem.childNodes[0] instanceof HTMLImageElement) {
                    elem.childNodes[0].style.maxWidth = '200px';
                    elem.childNodes[0].style.marginRight = '20px';
                }
                console.dir(elem.childNodes[1].childNodes[2]);
                if (elem.childNodes[1].childNodes[2] instanceof HTMLDivElement) { 
                    elem.childNodes[1].childNodes[2].style.width = '50%';                  
                }
            }
        })
    }
}

function changeView () {
    document.querySelector('.view-mode__table')?.addEventListener('click', () => {
        document.querySelector('.view-mode__list')?.classList.remove ('view-active');
        viewDisplay('table');
    });

    document.querySelector('.view-mode__list')?.addEventListener('click', () => {
        document.querySelector('.view-mode__table')?.classList.remove ('view-active');
        viewDisplay('list');
    });
}

function productSelection() {
    const tableProducts = document.querySelector('.table__products');
    if (tableProducts instanceof HTMLElement) {
        tableProducts.addEventListener('click', (event) => {
            if (event.target instanceof HTMLElement) {
                const titleProduct = event.target.textContent;
                productsArray.forEach(element => {
                    if (element.title === titleProduct){
                        localStorage.setItem(`id`, `${element.id}`);
                    };
                });           
            }   
        })
    }
}

export { checked, filtered, search, filtersObj, viewDisplay, changeView, productSelection };