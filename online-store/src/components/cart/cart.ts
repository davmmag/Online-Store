import {
  ProductDescription,
  ProductCartInfo,
  LocalStorageCartInfo,
  LocalInfo,
} from '../../types/types';
import {
  returnElement,
  findFromProduct,
  amountPrices,
  updatingShoppingCart,
  loadingProductsForCart,
  loadingToStorage
} from '../../functions/functions';
import Modal from '../modal/modal';
import Form from '../form/form';
import { productsArray } from '../../app/products';
class Cart {
  cart: HTMLElement;
  totalCost: number;
  priceCondition: Map<number, ProductCartInfo>;
  totalCostElement: HTMLElement;
  localStorageInfo!: LocalStorageCartInfo;
  clearCartBtn: HTMLElement;
  buyCartBtn: HTMLElement;
  productsInCart!: ProductDescription[];
  idProducts!: LocalInfo[];
  constructor() {
    this.cart = document.querySelector('.cart') as HTMLElement;
    this.priceCondition = new Map<number, ProductCartInfo>();
    this.totalCost = 0;
    this.totalCostElement = returnElement('div', 'cart__amount-value', `${this.totalCost} рублей`);
    this.clearCartBtn = returnElement(
      'button',
      'btn btn--circle btn__cart btn--clear',
      'Очистить корзину',
    );
    this.buyCartBtn = returnElement('button', 'btn btn--circle btn--buy btn__cart', 'Купить');
    this.localStorageInfo = {
      cost: this.totalCost,
      length: this.priceCondition.size,
    };
  }

  draw(data: ProductDescription[] | null): void {
    try {
      const breadcrumbsLink = document.querySelector('.breadcrumbs__link--title') as HTMLElement;
      breadcrumbsLink.textContent = 'Корзина';
      const cartContainer = returnElement('div', 'container cart__container');
      const listProducts = returnElement('ul', 'cart__products');
      const cartHeader = returnElement('div', 'cart__head');
      cartHeader.innerHTML = `
          <div class="cart__head-item">Товар</div>
          <div class="cart__head-item">Цена</div>
          <div class="cart__head-item">Количество</div>
          <div class="cart__head-item">Итого</div>
          <div class="cart__head-item"> </div>
        `;
      const footerCart = this.createFooterCart();
      cartContainer.append(cartHeader);
      if (data) {
        const cartItems = data.map((item) => this.createCartItem(item));
        if (cartItems) listProducts.append(...cartItems);
        cartContainer.append(listProducts);
      }
      cartContainer.append(...footerCart);
      this.cart.append(cartContainer);
    } catch (e) {
      console.log(e);
    }
  }

  clearCart(e: Event): void {
    const target = e.target as HTMLButtonElement;
    target.disabled = true;
    const cartProducts = document.querySelector('.cart__products') as HTMLElement;
    cartProducts.innerHTML = '';
    this.priceCondition.clear();
    this.totalCost = 0;
    this.totalCostElement.textContent = `${this.totalCost} рублей`;
    localStorage.removeItem('cart-data');
    this.loadToLocalStorage();
    const cartQuantity = document.querySelector('.number-goods') as HTMLElement;
    const cartTotalCost = document.querySelector('.sum-goods') as HTMLElement;
    cartQuantity.textContent = '0';
    cartTotalCost.textContent = '0';
    updatingShoppingCart();
  }

  loadToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.localStorageInfo));
    const newLocalInfo: LocalInfo[] = [];
    this.priceCondition.forEach(item => {
      const { id, cost, packagingAmount: packaging } = item;
      if (id !== undefined && packaging !== undefined) {
        const newData = { id: `${id}`, cost: `${cost}`, packaging: `${packaging}` };
        if (newData) newLocalInfo.push(newData);
      }
    });
    loadingToStorage('cart-data' ,newLocalInfo);
    updatingShoppingCart();
    // localStorage.setItem('cart-data', JSON.stringify(this.idProducts));
  }

  deleteProduct(target: HTMLElement): void {
    const productToDel = target.closest('.cart__product') as HTMLElement;
    const dataId = productToDel?.getAttribute('data-id');
    if (dataId) {
      const costDelElement = this.priceCondition.get(+dataId) as ProductCartInfo;
      this.priceCondition.delete(+dataId);
      productToDel.remove();
      this.totalCost -= costDelElement.cost;
      this.totalCostElement.textContent = `${this.totalCost} рублей`;
      this.loadToLocalStorage();
    }
  }

  getDataFromStorage(id: number): LocalInfo | undefined {
    const data: LocalInfo[] = JSON.parse(localStorage.getItem('cart-data') as string);
    const target: LocalInfo | undefined = data.find((elem) => elem.id === `${id}`);
    if (target) return target;
  }

  createCartItem(data: ProductDescription): Node | string {
    const { title, thumbnail, category, rating, weight, id, packaging: packagingDef, price: priceDef } = data;
    const dataFromStorage = this.getDataFromStorage(id);
    if (dataFromStorage) {
      const { cost: price, packaging } = dataFromStorage;
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
      const countBlock = this.createCountPackage('cart', packaging, weight, +price, id);
      const cartCost = returnElement('div', 'cart__cost');
      this.calculationThePrice(
        {
          id,
          price: priceDef,
          packaging: +packagingDef,
          input: countBlock.children[1] as HTMLInputElement,
          cost: 0,
          costElement: cartCost,
        },
        'create',
      );
      cartItemCost.append(cartCost);
      cartPackagingSection.append(countBlock);
      const btnDelete = returnElement('div', 'cart__trash');
      btnDelete.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="img">
          <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/>
        </svg>
      `;
      btnDelete.addEventListener('click', (e: Event) =>
        this.deleteProduct(e.target as HTMLElement),
      );
      cartSection.append(btnDelete);
      cartItem.append(cartPackagingSection, cartItemCost, cartSection);
      return cartItem;
    }
    return '';
  }

  calculationThePrice(args: ProductCartInfo, flag: boolean | 'create'): void {
    const { id, price, packaging, input, costElement } = args;
    const del = document.querySelector('.cart__trash') as HTMLElement;
    if (flag !== undefined) {
      if (flag === 'create') {
        const amount = +(+input.value / packaging).toFixed();
        const newCost = amount * price;
        costElement.textContent = `${newCost} рублей`;
        this.priceCondition.set(id, {
          id,
          price,
          packaging,
          input,
          cost: newCost,
          packagingAmount: +input.value,
          costElement,
        });
        this.totalCost += newCost;
        this.totalCostElement.textContent = `${this.totalCost} рублей`;
      }
      if (flag === true) {
        const newPackaging = +(+input.value + packaging).toFixed(2);
        input.value = `${newPackaging}`;
        const newCost = +((newPackaging / packaging) * price).toFixed();
        costElement.textContent = `${newCost} рублей`;
        this.priceCondition.set(id, {
          id,
          price,
          packaging,
          input,
          cost: newCost,
          packagingAmount: newPackaging,
          costElement,
        });
        this.totalCost = this.totalCost + price;
        this.loadToLocalStorage();
      }
      if (flag === false) {
        const newPackaging = +(+input.value - packaging).toFixed(2);
        input.value = `${newPackaging}`;
        const newCost = +((newPackaging / packaging) * price).toFixed();
        costElement.textContent = `${newCost} рублей`;
        this.priceCondition.set(id, {
          id,
          price,
          packaging,
          input,
          cost: newCost,
          packagingAmount: newPackaging,
          costElement,
        });
        if (newCost === 0) {
          this.deleteProduct(del);
          this.totalCost = this.totalCost - newCost;
        }
        this.totalCost = this.totalCost - price;
        this.loadToLocalStorage();
      }
      this.totalCostElement.textContent = `${this.totalCost} рублей`;
    }
  }

  createCountPackage(
    selector: string,
    packaging: string,
    weight: string,
    price: number,
    id: number,
  ): HTMLElement {
    const countBlock = returnElement('div', `${selector} count`);
    const btnRemove = returnElement('button', 'btn btn count__minus', '-');
    const inputValue = returnElement('input', 'count__value', '', {
      type: 'text',
      placeholder: `${packaging}`,
      value: `${packaging}`,
      readonly: true,
    }) as HTMLInputElement;
    const btnAdd = returnElement('button', 'btn btn count__plus', '+');
    countBlock.addEventListener('click', (e: Event) => this.countPackage(e, id));
    countBlock.append(btnRemove, inputValue, btnAdd);
    return countBlock;
  }

  countPackage(e: Event, idElem: number): void {
    const item = this.priceCondition.get(idElem);
    const target = e.target as HTMLButtonElement;
    if (item) {
      if (target.classList.contains('count__plus')) {
        this.calculationThePrice(item, true);
      }
      if (target.classList.contains('count__minus')) {
        this.calculationThePrice(item, false);
      }
    }
  }

  createFooterCart(): HTMLElement[] {
    const cartAmount = returnElement('div', 'cart__amount');
    const cartAmountName = returnElement('div', 'cart__amount-name', 'Общая сумма:');
    cartAmount.append(cartAmountName, this.totalCostElement);
    const cartBottom = returnElement('div', 'cart__bottom');
    this.buyCartBtn.addEventListener('click', () => this.buy());
    this.clearCartBtn.addEventListener('click', (e) => this.clearCart(e));
    cartBottom.append(this.clearCartBtn, this.buyCartBtn);
    return [cartAmount, cartBottom];
  }

  buy() {
    const modalElement = document.querySelector('.modal');
    if (modalElement) {
      Modal.switchModal();
    } else {
      const modal = new Modal();
      const form = new Form();
      modal.draw(form.create());
    }
  }

  getFromStorage(id: string) {
    return JSON.parse(localStorage.getItem(id) as string) as LocalInfo[];
  }

  setFromStorage(id: string, data: string) {
    localStorage.setItem(id, data);
  }

  loadCartInfo(data?: LocalInfo[]): LocalInfo[] {
    if (data) this.idProducts = data;
    return this.idProducts;
  }
}

export { Cart };
