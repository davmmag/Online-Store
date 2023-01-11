import { Cart } from '../components/cart/cart';
declare class Prime {
    cart: Cart;
    cartElement: HTMLElement;
    mainElement: HTMLElement | null;
    constructor();
    startMain(): void;
    startGoods(): void;
    startCart(): void;
}
export { Prime };
