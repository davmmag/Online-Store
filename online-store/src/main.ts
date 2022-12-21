import './style.scss';
import './app/index';

import Card from './components/card/card';

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

const card = new Card();
card.draw(dataObj);