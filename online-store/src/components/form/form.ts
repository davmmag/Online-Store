import { createElement } from "../../functions/functions";

class Form {
  formContainer: HTMLElement;
  constructor() {
    this.formContainer = createElement('div', 'form-box');
  }

  create(): HTMLElement {
    const form = createElement('form', 'form') as HTMLElement;
    const formItemPersonal = createElement('fieldset', 'form__item form__item--personal') as HTMLElement;
    const formItemCard = createElement('fieldset', 'form__item form__item--card') as HTMLElement;
    formItemPersonal.innerHTML = `
                  <input type="text" class="input form__name" placeholder="Name" />
                  <input type="tel" class="input form__phone-number" placeholder="Phone number" />
                  <input type="text" class="input form__address" placeholder="Delivery address" />
                  <input type="email" class="input form__email" placeholder="E-mail" />
    `;
    const btnNext = createElement('button', 'btn btn--circle form__btn', 'Next', {
      type: 'button',
    }) as HTMLElement;
    btnNext.addEventListener('click', () => {
      formItemPersonal.classList.add('form__item--personal--active');
      formItemCard.classList.add('form__item--card--active');
    });
    formItemPersonal.append(btnNext);
    formItemCard.innerHTML = `
                      <div class="card">
                    <div class="card__container">
                      <div class="card__icon">
                        <i class="fa-brands fa-cc-visa icon"></i>
                        <i class="fa-brands fa-cc-mastercard icon"></i>
                      </div>
                      <div class="card__number">
                        <input type="text" class="input input--card-number" placeholder="0000 0000 0000 0000" maxlength="19"/>
                      </div>
                      <div class="card__date">
                        <input type="text" class="input input--date" placeholder="ММ" maxlength="2" pattern="[0-9]*"/>
                        <input type="text" class="input input--date" placeholder="ГГ" maxlength="2" pattern="[0-9]*"/>
                      </div>
                    </div>
                    <div class="card__container break">
                      <div class="card__cvv">
                        <input type="text" class="input input--cvv" placeholder="CVV/CVC" maxlength="3"/>
                      </div>
                    </div>
                  </div>
    `;
    const btnSubmit = createElement('button', 'btn btn--circle form__btn btn--submit', 'Confirm') as HTMLElement;
    formItemCard.append(btnSubmit);
    form.append(formItemPersonal, formItemCard);
    this.formContainer.append(form);
    return this.formContainer;
  }
}

export default Form;