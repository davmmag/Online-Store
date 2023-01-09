import './style.scss';
import './app/index';
import { 
  //search, 
  checked, 
  filtered, 
  viewDisplay, 
  changeView, 
  productSelection, 
  filtersReset, 
  filtersSave, 
  getUrlQuery 
} from "./app/app";

import { start, renderCheckbox } from "./app/rendering";
import { slider } from "./app/slider";
import { productsArray } from './app/products';
import { Cart } from './components/cart/cart';

import { Prime } from './app/Prime';
import { ProductDescription, LocalInfo } from './types/types';
import { findFromProduct, updatingShoppingCart } from './functions/functions';

const page = document.body.className;
if (page === 'main') {
  const prime = new Prime();
  prime.startMain();
  const cart = new Cart();
  // cart.updateProductsInCart(productsArray);
  const cartElement = document.querySelector('.header-main__basket');
  const main = document.querySelector('main');
  const amountCart = document.querySelector('.number-goods') as HTMLElement;

  const returnProductsForCart = (
    idProducts: LocalInfo[],
    data: ProductDescription[],
  ): ProductDescription[] => {
    return idProducts.map((id) => findFromProduct(data, +id, 'id') as ProductDescription);
  };

  cartElement?.addEventListener('click', () => {
    // const previousData = JSON.parse(localStorage.getItem('cart-data') as string) as LocalInfo[];
    // cart.loadCartInfo(previousData);
    // const data = returnProductsForCart(previousData, productsArray);
    // cart.draw(data);
    // main?.remove();
  });

  // document.querySelector('.table__products')?.addEventListener('click', (e: Event) => {
  //   const target = e.target as HTMLElement;
  //   if (target.classList.contains('product-button')) {
  //     cart.updateProductsInCart(productsArray, target);
  //   }
  // });
}