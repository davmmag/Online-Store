interface ProductDesription {
    brand: string;
    country: string;
    size: {
        width: number;
        height: number;
    }
    surface: string;
    picture: string;
    rectified: boolean;
}
export {ProductDesription}