import { ProductDescription } from "../../types/types";
import { returnElement, countPackage, createCountPackage } from "../../functions/functions";
import Modal from "../modal/modal";
import Form from "../form/form";
import { type } from "os";

interface ProductCartInfo {
  id: number;
  price: number;
  packaging: number;
  cost: number;
}

interface LocalStorageInfo {
  cost: number;
  length: number;
}

class Cart {
  cart: HTMLElement;
  totalCost: number;
  priceCondition: Map<number, ProductCartInfo>;
  totalCostElement!: HTMLElement;
  localStorageInfo!: LocalStorageInfo;
  constructor() {
    this.cart = document.querySelector('.cart') as HTMLElement;
    this.priceCondition = new Map<number, ProductCartInfo>();
    this.totalCost = 0;
  }

  draw(data: ProductDescription[]): void {
    const cartContainer = returnElement('div', 'container cart__container');
    const listProducts = returnElement('ul', 'cart__products');
    const cartHeader = returnElement('li', 'cart__head');
    cartHeader.innerHTML = `
      <div class="cart__head-item">Товар</div>
      <div class="cart__head-item">Цена</div>
      <div class="cart__head-item">Количество</div>
      <div class="cart__head-item">Итого</div>
      <div class="cart__head-item"> </div>
    `;
    const cartItems = data.map((item) => this.createCartItem(item));
    listProducts.append(cartHeader, ...cartItems);
    const footerCart = this.createFooterCart();
    cartContainer.append(listProducts, ...footerCart);
    this.cart.append(cartContainer);
  }

  clearCart(e: Event): void {
    const target = e.target as HTMLButtonElement;
    target.disabled = true;
    const cartProducts = Array.from(document.querySelectorAll('.cart__product'));
    const cartAmountValue = document.querySelector('.cart__amount-value') as HTMLElement;
    this.totalCost = 0;
    this.totalCostElement.textContent = `${this.totalCost} рублей`;
    this.priceCondition.clear();
    if (cartProducts.length !== 0) {
      for (const product of cartProducts) {
        product.remove();
      }
      this.localStorageInfo.cost = 0;
      this.localStorageInfo.length = 0;
      localStorage.setItem('cart', JSON.stringify(this.localStorageInfo));
    }
  }

  deleteProduct(e: Event): void {
    const target = e.target as HTMLElement;
    const productToDel = target.closest('.cart__product');
    const id = productToDel?.getAttribute('data-id');
    const parent = target.closest('.cart__product') as HTMLElement;
    
    if (id) {
      const costDelElementValue = this.priceCondition.get(+id)?.cost;
      // parent.querySelector('.cart__cost')?.textContent = `${co}`
      if (costDelElementValue) {
        this.totalCost -= costDelElementValue;
        this.totalCostElement.textContent = `${this.totalCost} рублей`;
      }
      this.priceCondition.delete(+id);
      productToDel?.remove();
    }
  }

  createCartItem(data: ProductDescription): HTMLElement {
    const { title, thumbnail, category, rating, price, packaging, weight, id } = data;
    const cartItem = returnElement('li', 'cart__product', '', { 'data-id': id });
    cartItem.innerHTML = `
      <div class="cart__product-item cart__product-item--data">
        <img src="${thumbnail}" alt="" class="cart__product-img">
        <div class="cart__product-data">
          <h6 class="cart__section-name">${title}</h6>
          <p class="cart__category"><span>Категория:</span>${category}</p>
          <p class="cart__category"><span>Рейтинг:</span>${rating}</p>
        </div>
      </div>
      <div class="cart__product-item">
        <div class="cart__price">${price} рублей</div>
      </div>
    `;
    const cartSection = returnElement('div', 'cart__product-item');
    const cartPackagingSection = cartSection.cloneNode() as HTMLElement;
    const cartItemCost = cartSection.cloneNode() as HTMLElement;
    const countBlock = this.createCountPackage('cart', packaging, weight, price, id);
    const cost = this.calculationThePrice(
      id,
      price,
      +packaging,
      countBlock.children[1] as HTMLInputElement,
    );
    const cartCost = returnElement('div', 'cart__cost', `${cost} рублей`);
    cartItemCost.append(cartCost);
    cartPackagingSection.append(countBlock);
    const btnDelete = returnElement('div', 'cart__trash');
    btnDelete.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="img">
        <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/>
      </svg>
    `;
    btnDelete.addEventListener('click', (e: Event) => this.deleteProduct(e));
    cartSection.append(btnDelete);
    cartItem.append(cartPackagingSection, cartItemCost, cartSection);
    return cartItem;
  }

  calculationThePrice(
    id: number,
    price: number,
    packaging: number,
    input: HTMLInputElement,
  ): number {
    const cost = (+input.value / packaging) * price;
    this.totalCost += cost;
    this.priceCondition.set(id, { id, price, packaging, cost });
    return cost;
  }

  createCountPackage(
    selector: string,
    packaging: string,
    weight: string,
    price: number,
    id: number
  ): HTMLElement {
    const countBlock = returnElement('div', `${selector} count`);
    const btnRemove = returnElement('button', 'btn btn count__minus', '-');
    const inputValue = returnElement('input', 'count__value', '', {
      type: 'text',
      placeholder: `${packaging}`,
      value: `${packaging}`,
    }) as HTMLInputElement;
    const btnAdd = returnElement('button', 'btn btn count__plus', '+');
    countBlock.addEventListener('click', (e: Event) => this.countPackage(packaging, weight, e, id));
    countBlock.append(btnRemove, inputValue, btnAdd);
    return countBlock;
  }

  countPackage = (packaging: string, weight: string, e: Event, id: number): void => {
    const target = e.target as HTMLButtonElement;
    const currentTarget = e.currentTarget as HTMLElement;
    const inputValue = currentTarget.querySelector('.count__value') as HTMLInputElement;
    const elem = this.priceCondition.get(id) as ProductCartInfo;
    const parent = target.closest('.cart__product') as HTMLElement;
    const cartCost = parent.querySelector('.cart__cost') as HTMLElement;
    if (target.classList.contains('count__plus')) {
      const result = `${+inputValue.value + +packaging}`;
      inputValue.value = result;
      elem.cost += elem.price;
      elem.packaging += +packaging;
      this.totalCost += elem.cost;
      this.totalCostElement.textContent = `${this.totalCost} рублей`;
      this.priceCondition.set(id, elem);
      cartCost.textContent = `${elem.cost} рублей`;
      console.log(this.priceCondition);
    } else {
      const result = `${+inputValue.value - +packaging}`;
      if (+result > 0) {
        inputValue.value = result;
        elem.cost -= elem.price;
        elem.packaging -= +packaging;
        this.totalCost -= elem.cost;
        this.totalCostElement.textContent = `${this.totalCost} рублей`;
        this.priceCondition.set(id, elem);
        cartCost.textContent = `${elem.cost} рублей`;
      }
    }
  };

  createFooterCart(): HTMLElement[] {
    const cartAmount = returnElement('div', 'cart__amount');
    const cartAmountName = returnElement('div', 'cart__amount-name', 'Общая сумма:');
    this.totalCostElement = returnElement('div', 'cart__amount-value', `${this.totalCost} рублей`);
    cartAmount.append(cartAmountName, this.totalCostElement);
    const cartBottom = returnElement('div', 'cart__bottom');
    const btnBuy = returnElement('button', 'btn btn--circle btn--buy btn__cart', 'Купить');
    btnBuy.addEventListener('click', () => {
      const modal = new Modal();
      const form = new Form();
      modal.draw(form.create());
      Modal.switchModal();
    });
    const btnClear = returnElement(
      'button',
      'btn btn--circle btn__cart btn--clear',
      'Очистить корзину',
    );
    btnClear.addEventListener('click', (e) => this.clearCart(e));
    cartBottom.append(btnClear, btnBuy);
    return [cartAmount, cartBottom];
  }
}

export { Cart };