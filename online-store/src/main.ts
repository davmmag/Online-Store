import './style.scss';
import './app/index';

import { search, checked, filtered, viewDisplay, changeView, productSelection, filtersReset } from "./app/app";
import { start, renderCheckbox } from "./app/rendering";
import { slider } from "./app/slider";
import { productsArray } from './app/products';

const page = document.body.className;
if (page === 'main') {
  start();
  renderCheckbox();
  slider(productsArray);
  checked();
  search();
  filtered();
  viewDisplay('table');
  changeView();
  productSelection();
  filtersReset();
}