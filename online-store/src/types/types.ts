interface ProductDescription {
    brand: string;
    country: string;
    size: {
        width: number;
        height: number;
    }
    surface: string;
    picture: {
        onepicture: string;
        twopicture: string;
    }
    rectified: boolean;
    price: number;
}

export { ProductDescription }
