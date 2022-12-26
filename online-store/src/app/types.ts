interface ProductDescription {
    name: string;
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
type productsArrayType = [ProductDescription];

interface checkedCategory {
    [key: string]: string;
}
type checkedArrayType = [checkedCategory];

export { ProductDescription, productsArrayType, checkedArrayType }