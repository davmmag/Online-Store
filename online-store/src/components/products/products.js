import { ProductDescription } from '../../types/types.js'

ProductDescription.brand = 'QUA',
ProductDescription.brand = 'QUA',
ProductDescription.country = 'Turkey',
ProductDescription.size = {
    width: 120,
    height: 120,
},
ProductDescription.surface = 'Polished',
ProductDescription.picture = {
    onepicture: 'src/img/keramogranit-qua-60x120-sun-onyx-full-lap (1).jpg',
    twopicture: 'src/img/keramogranit-qua-60x120-sun-onyx-full-lap.jpg'
},
ProductDescription.rectified = true,
ProductDescription.price = 3450

const productsArray = [];
productsArray.push(ProductDescription);
console.log(productsArray);
export {productsArray};