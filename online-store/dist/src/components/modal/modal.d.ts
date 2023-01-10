declare class Modal {
    modal: HTMLElement;
    constructor();
    draw(data: HTMLElement): void;
    static switchModal(): void;
}
export default Modal;
