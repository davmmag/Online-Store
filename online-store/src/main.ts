import './style.scss';
import './app/index';

import { Prime } from './app/Prime';
import { ProductDescription, LocalInfo } from './types/types';
import { findFromProduct, updatingShoppingCart } from './functions/functions';

const prime = new Prime();
prime.startMain();