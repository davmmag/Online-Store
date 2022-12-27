import './style.scss';
import './app/index';

import { start, createTable, checked, filtered } from "./app/app";
import { productsArray } from "./app/products";


start();
createTable(productsArray);
checked();
filtered();