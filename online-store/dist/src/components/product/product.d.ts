import { ProductTable, ProductDescription } from "../../types/types";
declare class Product {
    product: HTMLElement;
    productFeaturesHeads: ProductTable;
    constructor();
    draw(data: ProductDescription | undefined): void;
    fillingProperties(data: ProductDescription): HTMLElement[];
    fillingImages(data: ProductDescription): HTMLElement;
    countPackage(packaging: string, weight: string, e: Event): void;
}
export default Product;
