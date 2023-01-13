import { ProductDescription, ProductCartInfo, LocalStorageCartInfo, LocalInfo } from '../../types/types';
declare class Cart {
    cart: HTMLElement;
    totalCost: number;
    priceCondition: Map<number, ProductCartInfo>;
    totalCostElement: HTMLElement;
    localStorageInfo: LocalStorageCartInfo;
    clearCartBtn: HTMLElement;
    buyCartBtn: HTMLElement;
    productsInCart: ProductDescription[];
    idProducts: LocalInfo[];
    constructor();
    draw(data: ProductDescription[] | null): void;
    clearCart(e: Event): void;
    loadToLocalStorage(): void;
    deleteProduct(target: HTMLElement): void;
    getDataFromStorage(id: number): LocalInfo | undefined;
    createCartItem(data: ProductDescription): Node | string;
    calculationThePrice(args: ProductCartInfo, flag: boolean | 'create'): void;
    createCountPackage(selector: string, packaging: string, weight: string, price: number, id: number): HTMLElement;
    countPackage(e: Event, idElem: number): void;
    createFooterCart(): HTMLElement[];
    buy(): void;
    getFromStorage(id: string): LocalInfo[];
    setFromStorage(id: string, data: string): void;
    loadCartInfo(data?: LocalInfo[]): LocalInfo[];
}
export { Cart };
