import { createElement } from '../../functions/functions';
class Modal {
  modal: HTMLElement;
  constructor() {
    this.modal = createElement('div', 'modal visually-hidden');
  }

  draw(data: HTMLElement = createElement('div', 'hello')): void {
    const container = createElement('div', 'modal__container') as HTMLElement;
    const body = createElement('div', 'modal__body') as HTMLElement;
    const btnClose = createElement('button', 'btn modal__close') as HTMLElement;
    btnClose.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    btnClose.addEventListener('click', Modal.switchModal);
    const content = createElement('div', 'modal__content') as HTMLElement;
    content.append(data);
    body.append(btnClose, content);
    container.append(body);
    this.modal.append(container);
    document.body.append(this.modal);
  }

  static switchModal(): void {
    const modal = document.querySelector('.modal') as HTMLElement;
    if (modal.classList.contains('visually-hidden')) {
      modal.classList.remove('visually-hidden');
      modal.setAttribute('aria-hidden', 'false');
    } else {
      modal.classList.add('visually-hidden');
      modal.setAttribute('aria-hidden', 'true');
    }
  }
}

export default Modal;