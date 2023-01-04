import './style.scss';
import * as data from './products.json';
import { ProductDescription } from './types/types';
import Product from './components/product/product';

import { getProduct } from './functions/functions';


const page = document.body.className;

if (page === 'goods') {
  const productData = getProduct(data.products);
  const product = new Product();
  product.draw(productData);
}