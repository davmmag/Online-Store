import './style.scss';
import './app/index';

import { search, checked, filtered } from "./app/app";
import { start } from "./app/rendering";
import { slider } from "./app/slider";
import { productsArray } from './app/products';


start();
slider(productsArray);
checked();
search();
filtered();