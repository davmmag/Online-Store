import './style.scss';
import './app/index';

import Cart from './components/cart/cart';
import Modal from './components/modal/modal';
import Form from './components/form/form';

const dataObj = {
  name: 'Керамогранит QUA 60x120 Sun Onyx Full Lap',
  picture: [
    'images/keramogranit-1.jpg', 
    'images/keramogranit-2.jpg', 
    'images/keramogranit-3.jpg', 
    'images/keramogranit-4.jpg', 
    'images/keramogranit-5.jpg'
  ],
  price: '3 450',
  features: {
    brand: 'QUA',
    country: 'Турция',
    size: '60х120',
    surface: 'Полированная',
    application: 'Стена/Пол',
    drawing: 'Камень',
    rectified: 'Да',
    packaging: '1.44',
    count: 54,
    weight: '29,8',
  },
}

const cart = new Cart();
cart.draw(dataObj);