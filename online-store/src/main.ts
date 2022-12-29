import './style.scss';
import './app/index';

import { start, search, checked, filtered, sortered } from "./app/app";
import { productsArray } from "./app/products";


start();
checked();
filtered();
sortered();
search();