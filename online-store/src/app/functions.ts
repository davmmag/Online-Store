import { productsArrayType } from "../app/types";

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
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `${value}`;
    checkbox.value = `${value}`;
 
    let label = document.createElement('label')
    label.htmlFor = `${value}`;
    label.appendChild(document.createTextNode(`${value}`));
 
    const CONT = `.${container}`
    console.log (CONT);
    let cont = document.querySelector(`${CONT}`);
    if (cont) {
        cont.appendChild(checkbox);
        cont.appendChild(label);
    }

}
function uniqueArray <T extends Object, P extends keyof T> (array: Array<T>,  key: P): Array<T[P]> {
    const newArr: Array<T[P]> = [];
    for (let i: number = 0; i < array.length; i++) {
        newArr.push(array[i][key]);
    }
    const uniqueName = new Set (newArr);
    return Array.from(uniqueName);
}


export { createElement, uniqueArray, createCheckbox };