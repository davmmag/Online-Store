import { Cart } from "../components/cart/cart";

import {
  //search,
  checked,
  filtered,
  viewDisplay,
  changeView,
  productSelection,
  filtersReset,
  filtersSave,
  getUrlQuery,
} from './app';

import { start, renderCheckbox } from './rendering';
import { slider } from './slider';
import { productsArray } from './products';
import { getProduct } from '../functions/functions';
import Product from '../components/product/product';

class Prime {
  cart: Cart;
  constructor() {
    this.cart = new Cart();
  }

  startMain() {
    const page = document.body.className;
    if (page === 'main') {
      start();
      renderCheckbox();
      filtered();
      slider(productsArray);
      checked();
      //search();
      viewDisplay('table');
      changeView();
      productSelection();
      filtersReset();
      filtersSave();
      getUrlQuery;
      //window.addEventListener('load', getLocalStorage);
    }
  }

  startGoods() {
    const productData = getProduct(productsArray);
    const product = new Product();
    product.draw(productData);
  }
}

export { Prime };