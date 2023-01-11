import { productsArray } from '../app/products';
import { ProductDescription, ProductFilters, ParamsUrl, LocalInfo } from '../types/types';

function addFiltersToUrl(filters: ProductFilters) {
  let url = new URL(window.location.href);
  if (filters.price) {
    url.searchParams.set('price_min', filters.price[0].toString());
    url.searchParams.set('price_max', filters.price[1].toString());
  }
  if (filters.country) {
    url.searchParams.set('country', filters.country.join(','));
  }
  if (filters.brand) {
    url.searchParams.set('brand', filters.brand.join(','));
  }
  if (filters.sorting) {
    url.searchParams.set('sorting', filters.sorting);
  }
  window.history.pushState({}, '', url.href);
}

function parseStringAndAddToObject(str: string, target: ProductFilters) {
  let data = new URLSearchParams(str);
  if (data.has("price_min") && data.has("price_max")) {
      target.price = [Number(data.get("price_min")), Number(data.get("price_max"))];
  }
  if (data.has("country")) {
      target.country = data.get("country")!.split(",");
  }
  if (data.has("brand")) {
      target.brand = data.get("brand")!.split(",");
  }
  if (data.has("sorting")) {
      target.sorting = data.get("sorting");
  }
  return target
}


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

  let div = document.createElement('div');
  div.className = 'checkbox-values';
  label.appendChild(div);

  let span = document.createElement('span');
  span.className = 'checkbox-value';
  span.innerHTML = `${amount} `;
  div.appendChild(span);

  span = document.createElement('span');
  span.className = 'checkbox-jumper';
  span.innerHTML = `/`;
  div.appendChild(span);

  span = document.createElement('span');
  span.className = 'checkbox-amount';
  span.innerHTML = ` ${amount}`;
  div.appendChild(span);
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

function sortingArray(array: ProductDescription[], value: string | null): ProductDescription[] {
  if (value === 'priceDescending') {
    return array.sort((a, b) => (b.price > a.price ? 1 : -1));
  }
  if (value === 'sizeAscending') {
    return array.sort((a, b) => (a.title > b.title ? 1 : -1));
  }
  if (value === 'sizeDescending') {
    return array.sort((a, b) => (b.title > a.title ? 1 : -1));
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
};

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

const findFromProduct = (
  arr: ProductDescription[],
  name: string | number = '',
  key: keyof ProductDescription,
  returnKey?: keyof ProductDescription,
) => {
  const result = arr.find((item) => item[key] === name);
  if (result) {
    if (returnKey) return result[returnKey];
    return result;
  }
};

const amountPrices = (arr: LocalInfo[]): number => {
  return arr.reduce((sum: number, current: LocalInfo) => sum + +current.cost!, 0);
};

const loadingToStorage = (key: string, data: LocalInfo[]) => {
  if (data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

const loadingCurrentState = (
  quantityElement: HTMLElement,
  costElement: HTMLElement,
  data: LocalInfo[],
): void => {
  quantityElement.textContent = `${data.length}`;
  const cost = amountPrices(data);
  costElement.textContent = `${cost}`;
};

const updatingShoppingCart = (
  target?: HTMLElement,
  data?: ProductDescription[] | ProductDescription,
): void => {
  const cartQuantity = document.querySelector('.number-goods') as HTMLElement;
  const cartTotalCost = document.querySelector('.sum-goods') as HTMLElement;
  const dataFromStorage = localStorage.getItem('cart-data') as string;
  let previousData: LocalInfo[] | null = null;
  if (dataFromStorage) previousData = JSON.parse(dataFromStorage) as LocalInfo[];
  const btnMains = Array.from(document.querySelectorAll('.product-button')) as HTMLButtonElement[];
  if (!target) {
    if (previousData !== null) {
      loadingCurrentState(cartQuantity, cartTotalCost, previousData);
      const btnCart = document.querySelector('.product__btn-product');

      if (btnCart) {
        const key = localStorage.getItem('id');
        const flag = previousData.findIndex((item) => item.id === `${key}`);
        if (flag !== -1) btnCart.textContent = 'Удалить из корзины';
      }
      if (btnMains && btnMains.length) {
        btnMains.forEach((btn) => {
          const id = btn.getAttribute('data-b');
          const res = previousData!.find((item) => {
            if (item.id === id) return item;
          });
          if (res) btn.textContent = 'Удалить из корзины';
        });
      }
    }
  }
  if (data && target) {
    if (target.classList.contains('product-button') && data instanceof Array) {
      const parent = target.closest('.product-item') as HTMLElement;
      const name = parent.querySelector('.product-name') as HTMLElement;
      const productId = findFromProduct(data, name.textContent!, 'title', 'id') as number;
      if (previousData !== null) {
        const index = previousData.findIndex((item) => item.id === `${productId}`);
        const price = findFromProduct(data, productId, 'id', 'price') as number;
        if (index === -1) {
          target.textContent = 'Удалить из корзины';
          const packaging = findFromProduct(data, productId, 'id', 'packaging');
          const newProduct = { id: `${productId}`, cost: `${price}`, packaging } as LocalInfo;
          previousData.push(newProduct);
          loadingToStorage('cart-data', previousData);
          loadingCurrentState(cartQuantity, cartTotalCost, previousData);
        } else {
          target.textContent = 'Добавить в корзину';
          previousData.splice(index, 1);
          loadingToStorage('cart-data', previousData);
          loadingCurrentState(cartQuantity, cartTotalCost, previousData);
        }
      } else {
        const packaging = findFromProduct(data, productId, 'id', 'packaging');
        const price = findFromProduct(data, productId, 'id', 'price') as number;
        const newProduct = { id: `${productId}`, cost: `${price}`, packaging } as LocalInfo;
        loadingToStorage('cart-data', [newProduct]);
        loadingCurrentState(cartQuantity, cartTotalCost, [newProduct]);
      }
    }
    if (target.classList.contains('product__btn-product')) {
      const { id, price, packaging } = data as ProductDescription;
      const value = document.querySelector('.count__value') as HTMLInputElement;
      const newP = value.value;
      const cost = ((+newP / +packaging) * price).toFixed();
      if (previousData !== null) {
        const index = previousData.findIndex((item) => item.id === `${id}`);
        if (index === -1) {
          target.textContent = 'Удалить из корзины';

          const newProduct = { id: `${id}`, cost, packaging: value.value } as LocalInfo;
          previousData.push(newProduct);
          loadingToStorage('cart-data', previousData);
          loadingCurrentState(cartQuantity, cartTotalCost, previousData);
        } else {
          target.textContent = 'Добавить в корзину';
          previousData.splice(index, 1);
          loadingToStorage('cart-data', previousData);
          loadingCurrentState(cartQuantity, cartTotalCost, previousData);
        }
      } else {
        const newProduct = { id: `${id}`, cost, packaging: value.value } as LocalInfo;
        loadingToStorage('cart-data', [newProduct]);
        loadingCurrentState(cartQuantity, cartTotalCost, [newProduct]);
      }
    }
  }
};

const addListenerBtn = (data: ProductDescription[] | ProductDescription) => {
  const tableProducts = document.querySelector('.table__products');
  tableProducts?.addEventListener('click', (e) => {
    if (e.target instanceof HTMLElement) {
    const target = e.target;
    updatingShoppingCart(target, data);
    if (target.classList.contains('product-name') && Array.isArray(data)) {
      const titleProduct = target.textContent;
      data.forEach((element) => {
        if (element.title === titleProduct) {
          localStorage.setItem(`id`, `${element.id}`);
        }
      });
    }
    }
  });
};

const loadingProductsForCart = (data: ProductDescription[]): ProductDescription[] | null => {
  const cartData = JSON.parse(localStorage.getItem('cart-data') as string) as LocalInfo[];
  if (cartData) {
    const resultData = cartData.map((item) =>
      findFromProduct(data, +item.id, 'id'),
    ) as ProductDescription[];
    return resultData;
  }
  return null;
};

export {
  addFiltersToUrl,
  parseStringAndAddToObject,
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
  findFromProduct,
  amountPrices,
  updatingShoppingCart,
  loadingProductsForCart,
  addListenerBtn,
};
