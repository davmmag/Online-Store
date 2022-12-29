import { productsArray } from "../app/products";
import { ProductDescription, ProductFilters } from "../app/types";


function createElement (type: string, parent: string, children: string, text?: string) {
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

function createCheckbox (value: string | number, container: string) {
    let label = document.createElement('label');
    let cont = document.querySelector(`.${container}`);
    if (cont) {
        cont.appendChild(label);
    }
    
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = `${value}`;
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(`${value}`));

}

function uniqueArray <T extends Object, P extends keyof T> (array: Array<T>,  key: P): Array<T[P]> {
    const newArr: Array<T[P]> = [];
    for (let i: number = 0; i < array.length; i++) {
        newArr.push(array[i][key]);
    }
    const uniqueName = new Set (newArr);
    return Array.from(uniqueName);
}

function filteredArray (array: ProductDescription[]): ProductDescription[] {
    return array;
}

function removeArrEl (arr: ProductFilters[], value: Object) {
}

function sortingArray (array: ProductDescription[], value: string): ProductDescription[] {
    if (value === "priceDescending") {return array.sort((a, b) => b.price > a.price ? 1 : -1);}
    if (value === "sizeAscending") {return array.sort((a, b) => a.rating > b.rating ? 1 : -1);}
    if (value === "sizeDescending") {return array.sort((a, b) => b.rating > a.rating ? 1 : -1);}
    return array.sort((a, b) => a.price > b.price ? 1 : -1);
}

export { createElement, uniqueArray, createCheckbox, filteredArray, removeArrEl, sortingArray };