import { createElement } from "../../functions/functions";
import { CartTable,DataCart } from "../../types/types";

class Cart {
  cart: HTMLElement;
  cartFeaturesHeads: CartTable;
  constructor() {
    this.cart = document.querySelector('.cart') as HTMLElement;
    this.cartFeaturesHeads = {
      brand: 'Бренд',
      country: 'Страна',
      size: 'Размер',
      surface: 'Поверхность',
      application: 'Область применения',
      drawing: 'Рисунок',
      rectified: 'Ректифицированная',
      packaging: 'Кв. м. в упаковке',
      count: 'Штук в упаковке',
      weight: 'Вес упаковки (кг)',
    }
  }

  draw(data: DataCart): void {
    const cartContainer: HTMLElement = createElement('div', 'container cart__container');
    const cartData = createElement('div', 'cart__data');
    const cartTitle = createElement('h1', 'cart__title', data.name);
    const featuresTop = createElement('div', 'cart__features-top');
    const cartValue = createElement('div', 'cart__value', data.price);
    const cartPriceBlock = createElement('div', 'cart__price');
    const cartCount = createElement('div', 'cart__count count');
    cartCount.innerHTML = 
    `
    <button class="btn btn count__minus">
                <i class="fa-solid fa-minus"></i>
              </button>
              <input type="text" class="count__value" placeholder="${data.features.packaging}" value="${data.features.packaging}">
              <button class="btn count__plus">
                <i class="fa-solid fa-plus"></i>
    </button>
    `
    const btnCart = createElement('button', 'btn btn--circle cart__btn-cart');
    btnCart.innerHTML = `
    <i class="fa-solid fa-cart-shopping"></i>
              <span>Добавить в корзину</span>
    `;
    const btnPay = createElement('button', 'btn btn--circle cart__btn-pay');
    btnPay.innerHTML = `
    <i class="fa-regular fa-credit-cart"></i>
              <span>Купить сейчас</span>
    `
    const featuresBottom = createElement('div', 'cart__features-bottom');
    const cartSlider = createElement('div', 'cart__slider');
    cartSlider.innerHTML = `
        <div
      style="--swiper-navigation-color: #fff; --swiper-pagination-color: #fff"
      class="swiper mySwiper2"
    >
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <img src="./assets/${data.picture[0]}" />
        </div>
        <div class="swiper-slide">
          <img src="./assets/${data.picture[1]}" />
        </div>
        <div class="swiper-slide">
          <img src="./assets/${data.picture[2]}" />
        </div>
        <div class="swiper-slide">
          <img src="./assets/${data.picture[3]}" />
        </div>
        <div class="swiper-slide">
          <img src="./assets/${data.picture[4]}" />
        </div>
      </div>
    </div>
    <div thumbsSlider="" class="swiper mySwiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <img src="./assets/${data.picture[0]}" />
        </div>
        <div class="swiper-slide">
          <img src="./assets/${data.picture[1]}" />
        </div>
        <div class="swiper-slide">
          <img src="./assets/${data.picture[2]}" />
        </div>
        <div class="swiper-slide">
          <img src="./assets/${data.picture[3]}" />
        </div>
        <div class="swiper-slide">
          <img src="./assets/${data.picture[4]}" />
        </div>
      </div>
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
    </div>
    `
    const features = data.features;
    type KeyFeatures = keyof typeof features;
    type KeyFeaturesHead = keyof typeof this.cartFeaturesHeads;
    Object.keys(features).forEach((key) => {
      const value = features[key as KeyFeatures];
      const cartBlock = createElement('div', 'cart__features-block');
      const cartBlockHead = createElement('div', 'cart__features-head' , this.cartFeaturesHeads[key as KeyFeaturesHead]);
      const cartBlockValue = createElement('div', 'cart__features-value', value as string);
      cartBlock.append(cartBlockHead, cartBlockValue);
      featuresBottom.append(cartBlock);
    })
    cartPriceBlock.append(cartCount, btnCart, btnPay);
    featuresTop.append(cartValue, cartPriceBlock);
    cartData.append(cartTitle, featuresTop, featuresBottom);
    cartContainer.append(cartData, cartSlider);
    this.cart.append(cartContainer);
  }
}

export default Cart;