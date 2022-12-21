import { productsArrayType } from "../../types/types";

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
/*
function uniqueArray(array: productsArrayType, key: string) {
        const newArr: [] = [];
        for (let i: number = 0; i < array.length; i++){
            newArr.push(array[i][key]);
        }
        const uniqueNames = new Set(newArr);
        return Array.from(uniqueNames);
}
*/
export { createElement};