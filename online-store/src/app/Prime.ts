import { Cart } from '../components/cart/cart';
import { updatingShoppingCart } from '../functions/functions';

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
import { getProduct, loadingProductsForCart, addListenerBtn } from '../functions/functions';
import Product from '../components/product/product';

class Prime {
  cart: Cart;
  cartElement: HTMLElement;
  mainElement: HTMLElement | null;
  constructor() {
    this.cart = new Cart();
    this.cartElement = document.querySelector('.header-main__basket') as HTMLElement;
    this.mainElement = document.querySelector('main');
  }

  startMain() {
    const page = document.body.className;
    this.cartElement.addEventListener('click', () => this.startCart(), { once: true });
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
      getUrlQuery();
      //window.addEventListener('load', getLocalStorage);
      updatingShoppingCart();
      addListenerBtn(productsArray);
    }
  }

  startGoods() {
    const page = document.body.className;
    this.cartElement.addEventListener(
      'click',
      () => {
        this.startCart();
        document.querySelector('.breadcrumbs')?.classList.add('visually-hidden');
        document.querySelector('.product')?.classList.add('visually-hidden');
      },
      { once: true },
    );
    if (page === 'goods') {
      const productData = getProduct(productsArray);
      const product = new Product();
      product.draw(productData);
      updatingShoppingCart();
    }
  }

  startCart() {
    this.cartSection = document.querySelector('.cart');
    const breadcrumbsLink = document.querySelector('.breadcrumbs__link--title') as HTMLElement;
    if (this.cartSection) {
      if (this.mainElement) {
        this.mainElement.classList.add('visually-hidden');
        const logoElement = document.querySelector('.header-main__logo');
        if (logoElement) {
          logoElement.addEventListener(
            'click',
            (e) => {
              e.preventDefault();
              updatingShoppingCart();
              this.mainElement?.classList.remove('visually-hidden');
              breadcrumbsLink.textContent = '';
              this.cartSection!.innerHTML = '';
            },
            { once: true },
          );
        }
      }
      if (this.goodsElement) {
        this.goodsElement.classList.add('visually-hidden');
        const logoElement = document.querySelector('.header-main__logo');
        if (logoElement) {
          logoElement.addEventListener(
            'click',
            (e) => {
              this.goodsElement?.classList.remove('visually-hidden');
              this.cartSection!.innerHTML = '';
            },
            { once: true },
          );
        }
      }
      this.cartSection.innerHTML = '';
      const cart = new Cart();
      const dataForCart = loadingProductsForCart(productsArray);
      cart.draw(dataForCart);
    }
  }
}

export { Prime };
