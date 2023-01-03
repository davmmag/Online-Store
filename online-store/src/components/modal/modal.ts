import { returnElement } from '../../functions/functions';
class Modal {
  modal: HTMLElement;
  constructor() {
    this.modal = returnElement('div', 'body', 'modal visually-hidden');
  }

  draw(data: HTMLElement): void {
    const container = returnElement('div', 'modal__container');
    const body = returnElement('div', 'modal__body') as HTMLElement;
    const btnClose = returnElement('button', 'btn modal__close') as HTMLElement;
    btnClose.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    btnClose.addEventListener('click', Modal.switchModal);
    const content = returnElement('div', 'modal__content') as HTMLElement;
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