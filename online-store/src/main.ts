import './style.scss';
import './app/index';

import { 
  search, 
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

const page = document.body.className;
if (page === 'main') {
  start();
  renderCheckbox();
  filtered();
  slider(productsArray);
  checked();
  search();
  viewDisplay('table');
  changeView();
  productSelection();
  filtersReset();
  filtersSave();
  getUrlQuery
  //window.addEventListener('load', getLocalStorage);
}