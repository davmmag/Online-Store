import { Cart } from '../components/cart/cart';
import { updatingShoppingCart } from '../functions/functions';

import {
  //search,
  checked,
  filtered,
  viewDisplay,
  changeView,
  filtersReset,
  filtersSave,
  getUrlQuery,
} from './app';

import { start, renderCheckbox } from './rendering';
import { slider } from './slider';
import { productsArray } from './products';
import { getProduct, loadingProductsForCart, addListenerBtn} from '../functions/functions';
import Product from '../components/product/product';
import Form from '../components/form/form';

class Prime {
  cart: Cart;
  cartElement: HTMLElement;
  mainElement: HTMLElement | null;
  cartSection: HTMLElement | null;
  goodsElement!: HTMLElement | null;
  constructor() {
    this.cart = new Cart();
    this.cartElement = document.querySelector('.header-main__basket') as HTMLElement;
    this.mainElement = document.querySelector('main');
    this.cartSection = document.querySelector('.cart');
    this.goodsElement = document.querySelector('.product');
  }

  startMain() {
    const page = document.body.className;
    
    if (page === 'main') {
      this.cartElement.addEventListener('click', () => this.startCart());
      start();
      renderCheckbox();
      filtered();
      slider(productsArray);
      checked();
      //search();
      viewDisplay('table');
      changeView();
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
    
    if (page === 'goods') {
      this.cartElement.addEventListener('click', () => this.startCart());
      const productData = getProduct(productsArray);
      const product = new Product();
      product.draw(productData);
      updatingShoppingCart();
      const btnPay = document.querySelector('.product__btn-pay');
      btnPay?.addEventListener('click', () => {
        this.startCart();
        this.cart.buy();
      })
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
            logoElement.addEventListener('click', (e) => {
              e.preventDefault();
              this.mainElement?.classList.remove('visually-hidden');
              breadcrumbsLink.textContent = '';
              this.cartSection!.innerHTML = '';
            }, { once: true });
          }
        }
        if (this.goodsElement) {
          this.goodsElement.classList.add('visually-hidden');
          const logoElement = document.querySelector('.header-main__logo');
          if (logoElement) { 
            logoElement.addEventListener('click', (e) => {
              this.goodsElement?.classList.remove('visually-hidden');
              this.cartSection!.innerHTML = '';
            }, { once: true });
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
