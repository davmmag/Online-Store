import './style.scss';
import './app/index';

import { search, checked, filtered } from "./app/app";
import { start, renderCheckbox } from "./app/rendering";
import { slider } from "./app/slider";
import { productsArray } from './app/products';


start();
renderCheckbox ();
slider(productsArray);
checked();
search();
filtered();