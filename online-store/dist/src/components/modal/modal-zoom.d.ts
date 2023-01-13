declare class ModalZoom {
    modal: HTMLElement;
    constructor();
    create(src: string): void;
    appendOverlay(): void;
    closeZoom(): void;
    positionElement(target: HTMLElement): void;
}
export default ModalZoom;
