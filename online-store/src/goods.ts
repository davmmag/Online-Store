import './style.scss';
import * as data from './products.json';
import { ProductDescription } from './types/types';
import Product from './components/product/product';
const page = document.body.className;
function getComponent<T extends ProductDescription>(arg: T[]): ProductDescription {
    // const id = Number(localStorage.getItem('id'));
    console.log(arg);
    const id = 1;
    const product = arg[id as keyof typeof arg] as ProductDescription;
    return product;
}

if (page === 'goods') {
  const c = getComponent(data.products);
  const product = new Product();
  product.draw(c);
}