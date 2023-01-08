import { productsArray } from '../app/products';
import { ProductDescription, ProductFilters, ParamsUrl } from '../types/types';

const returnElement = (selector: string, name: string, text?: string, attrs?: object) => {
  const element = document.createElement(selector);
  element.className = name;
  if (text && selector !== 'input') element.textContent = text;
  if (attrs) {
    type Key = keyof typeof attrs;
    for (const key in attrs) {
      element.setAttribute(key, attrs[key as Key]);
    }
  }
  return element;
};

function createElement(type: string, parent: string, children: string, text?: string) {
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

function createCheckbox<T extends keyof ProductDescription>(
  value: string,
  container: string,
  key: T,
) {
  let label = document.createElement('label');
  label.className = 'checkbox-label';
  let cont = document.querySelector(`.${container}`);
  if (cont) {
    cont.appendChild(label);
  }
  let amount = productsArray.filter((obj) => obj[key] === `${value}`).length;

  let checkbox = document.createElement('input');
  checkbox.className = 'checkbox-input';
  checkbox.type = 'checkbox';
  checkbox.value = `${value}`;
  label.appendChild(checkbox);
  label.appendChild(document.createTextNode(`${value} `));

  let span = document.createElement('span');
  span.className = 'checkbox-amount';
  span.innerHTML = `${amount}`;
  label.appendChild(span);
}

function changeCheckbox(array: ProductDescription[], key: string) {
  let nodeList = document.querySelectorAll('.checkbox-input') as NodeListOf<HTMLInputElement>;
  for (let i = 0; i < nodeList.length; i++) {
    nodeList[i].value;
  }
}

function uniqueArray<T extends Object, P extends keyof T>(array: Array<T>, key: P): Array<T[P]> {
  const newArr: Array<T[P]> = [];
  for (let i: number = 0; i < array.length; i++) {
    newArr.push(array[i][key]);
  }
  const uniqueName = new Set(newArr);
  return Array.from(uniqueName);
}

function filterArray(array: ProductDescription[], arrayCheck: string[]): ProductDescription[] {
  let newArr = [];
  newArr = array.filter((elem) => arrayCheck.includes(elem.country));
  return newArr;
}

function removeArrEl(arr: ProductFilters[], value: Object) {}

function sortingArray(array: ProductDescription[], value: string): ProductDescription[] {
  if (value === 'priceDescending') {
    return array.sort((a, b) => (b.price > a.price ? 1 : -1));
  }
  if (value === 'sizeAscending') {
    return array.sort((a, b) => (a.rating > b.rating ? 1 : -1));
  }
  if (value === 'sizeDescending') {
    return array.sort((a, b) => (b.rating > a.rating ? 1 : -1));
  }
  return array.sort((a, b) => (a.price > b.price ? 1 : -1));
}

function searchFunction(array: ProductDescription[], text: string): ProductDescription[] {
  let newArr = [];
  newArr = array.filter((elem) => Object.values(elem).includes(text));
  return newArr;
}

function minPriceFunc(array: ProductDescription[]): number {
  return array.reduce((min, p) => (p.price < min ? p.price : min), productsArray[0].price);
}

function maxPriceFunc(array: ProductDescription[]): number {
  return array.reduce((max, p) => (p.price > max ? p.price : max), productsArray[0].price);
}

function toUrlParams (filterObj: ProductFilters) {
  let newObj: Record<string, string> = {
    minprice: `${filterObj.price[0]}`,
    maxprice: `${filterObj.price[1]}`,
  }
  
  if (filterObj.country) {
    newObj.country = filterObj.country.join('+');
  }
  if (filterObj.brand) {
    newObj.brand = filterObj.brand.join('+');
  }
  return newObj;
}

const getProduct = (products: ProductDescription[]): ProductDescription | undefined => {
  const id = localStorage.getItem('id');
  if (id) {
    const component = products.find((item) => item.id === +id) as ProductDescription;
    if (component) return component;
    return undefined;
  }
};

const countPackage = (packaging: string, weight: string, e: Event): void => {
    const target = e.target as HTMLButtonElement;
    const currentTarget = e.currentTarget as HTMLElement;
    const inputValue = currentTarget.querySelector('.count__value') as HTMLInputElement;
    if (target.classList.contains('count__plus')) {
      const result = `${+inputValue.value + +packaging}`;
      inputValue.value = result;
    } else {
      const result = `${+inputValue.value - +packaging}`;
      if (+result > 0) inputValue.value = result;
    }
}

const createCountPackage = (selector: string, packaging: string, weight: string): HTMLElement => {
  const countBlock = returnElement('div', `${selector} count`);
  const btnRemove = returnElement('button', 'btn btn count__minus', '-');
  const inputValue = returnElement('input', 'count__value', '', {
    type: 'text',
    placeholder: `${packaging}`,
    value: `${packaging}`,
  });
  const btnAdd = returnElement('button', 'btn btn count__plus', '+');
  countBlock.addEventListener('click', (e: Event) => countPackage(packaging, weight, e));
  countBlock.append(btnRemove, inputValue, btnAdd);
  return countBlock;
};

export {
  createElement,
  uniqueArray,
  createCheckbox,
  removeArrEl,
  sortingArray,
  filterArray,
  searchFunction,
  minPriceFunc,
  maxPriceFunc,
  changeCheckbox,
  returnElement,
  getProduct,
  countPackage,
  createCountPackage,
  toUrlParams
};