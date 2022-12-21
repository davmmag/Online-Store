import { productsArrayType } from '../../types/types'

const productsArray: productsArrayType  = [
    {
        brand: 'QUA',
        country: 'Turkey',
        size: {
            width: 120,
            height: 120,
        },
        surface: 'Polished',
        picture: {
            onepicture: 'src/img/keramogranit-qua-60x120-sun-onyx-full-lap (1).jpg',
            twopicture: 'src/img/keramogranit-qua-60x120-sun-onyx-full-lap.jpg'
        },
        rectified: true,
        price: 450
    }
];

export { productsArray };