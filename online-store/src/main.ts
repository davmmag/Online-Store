import './style.scss';
import './app/index';

import App from "./app/app";
import { productsArray } from "./app/products";

const app: App = new App();
app.start();
app.createTable(productsArray);
app.checked();