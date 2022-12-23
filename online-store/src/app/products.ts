import { ProductDescription } from "./types";

const productsArray: ProductDescription[]  = [
    {
        name: 'Керамогранит QUA 60x120 Sun Onyx Full Cap',
        brand: 'QUA',
        country: 'Turkey',
        size: {
            width: 60,
            height: 120,
        },
        surface: 'Polished',
        picture: {
            onepicture: './assets/img/keramogranit-qua-60x120-sun-onyx-full-lap (1).jpg',
            twopicture: './assets/img/keramogranit-qua-60x120-sun-onyx-full-lap.jpg'
        },
        rectified: true,
        price: 3450
    },
    {
        name: 'Керамогранит Vitra 60x120 Kalakatta White',
        brand: 'Vitra',
        country: 'Russia',
        size: {
            width: 60,
            height: 60,
        },
        surface: 'Matte',
        picture: {
            onepicture: './assets/img/marmori-kalakatta-belyj-polirovannyj-rektifikat-60x60-k947000flpr1vte0 (1).jpg',
            twopicture: './assets/img/marmori-kalakatta-belyj-polirovannyj-rektifikat-60x60-k947000flpr1vte0.jpg'
        },
        rectified: false,
        price: 2450
    }
];

export { productsArray };