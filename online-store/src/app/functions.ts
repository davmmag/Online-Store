import { productsArray } from "../app/products";
import { ProductDescription } from "../app/types";

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

function filteredArray (value: string): ProductDescription[] {
    const newArr = productsArray.filter((obj) => Object.values(obj).some((el) => el === value));
    return newArr;
}

function removeArrEl (arr: string[], value: string) {
    const newArr = arr.filter(el => el !== value);
    return newArr;
}

export { createElement, uniqueArray, createCheckbox, filteredArray, removeArrEl };