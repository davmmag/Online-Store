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

const prime = new Prime();
prime.startMain();