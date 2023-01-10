import './style.scss';
import './app/index';
import { Prime } from './app/Prime';

const prime = new Prime();
const page = document.body.className;
if (page === 'main') {
  prime.startMain();
} else {
  prime.startGoods();
}