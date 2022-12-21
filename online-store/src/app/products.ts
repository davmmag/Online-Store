import { ProductDescription, productsArrayType } from "./types";

const productsArray: ProductDescription[]  = [
    {
        brand: 'QUA',
        country: 'Turkey',
        size: {
            width: 60,
            height: 120,
        },
        surface: 'Polished',
        picture: {
            onepicture: 'src/assets/img/keramogranit-qua-60x120-sun-onyx-full-lap (1).jpg',
            twopicture: 'src/assets/img/keramogranit-qua-60x120-sun-onyx-full-lap.jpg'
        },
        rectified: true,
        price: 3450
    },
    {
        brand: 'Vitra',
        country: 'Russia',
        size: {
            width: 60,
            height: 60,
        },
        surface: 'Matte',
        picture: {
            onepicture: 'src/assets/img/marmori-kalakatta-belyj-polirovannyj-rektifikat-60x60-k947000flpr1vte0 (1).jpg',
            twopicture: 'src/assets/img/marmori-kalakatta-belyj-polirovannyj-rektifikat-60x60-k947000flpr1vte0.jpg'
        },
        rectified: false,
        price: 2450
    }
];

export { productsArray };