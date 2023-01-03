import { returnElement } from "../../functions/functions";


class ModalZoom {
  modal: HTMLElement;
  constructor() {
    this.modal = returnElement('div', 'modal-zoom');
  }

  create(src: string) {
    this.appendOverlay();
    const modalContainer = returnElement('div', 'modal-zoom__container');
    const modalContent = returnElement('div', 'modal-zoom__content');
    const blockImg = returnElement('div', 'modal-zoom__block-img');
    blockImg.innerHTML = `<img src="${src}" alt="" class="img modal-zoom__img">`;
    const close = returnElement('a', 'close modal-zoom__close');
    close.addEventListener('click', this.closeZoom);
    modalContent.append(blockImg);
    modalContainer.append(modalContent, close);
    this.modal.append(modalContainer);
    document.body.append(this.modal);
    this.positionElement(this.modal);
    window.addEventListener('resize', () => this.positionElement(this.modal));
  }

  appendOverlay() {
    const overlay = returnElement('div', 'overlay');
    document.body.append(overlay);
    overlay.addEventListener('click', this.closeZoom);
  }

  closeZoom() {
    const overlay = document.querySelector('.overlay');
    const modal = document.querySelector('.modal-zoom');
    if (overlay) overlay.remove();
    if (modal) modal.remove();
  }

  positionElement(target: HTMLElement) {
    const windowWidth: number = document.body.clientWidth;
    const targetWidth: number = target.offsetWidth;
    target.style.left = `${(windowWidth - targetWidth) / 2}px`;
    target.style.top = `${40}px`;
  }
}

export default ModalZoom;