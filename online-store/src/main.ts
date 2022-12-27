import './style.scss';
import './app/index';

import { start, createTable, checked, filtered, sortered } from "./app/app";
import { productsArray } from "./app/products";


start();
createTable(productsArray);
checked();
filtered();
sortered();