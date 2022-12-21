import { createElement } from "../../functions/functions";
import { CardTable,DataCard } from "../../types/types";

class Card {
  card: HTMLElement;
  cardFeaturesHeads: CardTable;
  constructor() {
    this.card = document.querySelector('.card') as HTMLElement;
    this.cardFeaturesHeads = {
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

  draw(data: DataCard): void {
    const cardContainer: HTMLElement = createElement('div', 'container card__container');
    const cardData = createElement('div', 'card__data');
    const cardTitle = createElement('h1', 'card__title', data.name);
    const featuresTop = createElement('div', 'card__features-top');
    const cardValue = createElement('div', 'card__value', data.price);
    const cardPriceBlock = createElement('div', 'card__price');
    const cardCount = createElement('div', 'card__count count');
    cardCount.innerHTML = 
    `
    <button class="btn btn count__minus">
                <i class="fa-solid fa-minus"></i>
              </button>
              <input type="text" class="count__value" placeholder="${data.features.packaging}" value="${data.features.packaging}">
              <button class="btn count__plus">
                <i class="fa-solid fa-plus"></i>
    </button>
    `
    const btnCart = createElement('button', 'btn btn--circle card__btn-cart');
    btnCart.innerHTML = `
    <i class="fa-solid fa-cart-shopping"></i>
              <span>Добавить в корзину</span>
    `;
    const btnPay = createElement('button', 'btn btn--circle card__btn-pay');
    btnPay.innerHTML = `
    <i class="fa-regular fa-credit-card"></i>
              <span>Купить сейчас</span>
    `
    const featuresBottom = createElement('div', 'card__features-bottom');
    const cardSlider = createElement('div', 'card__slider');
    cardSlider.innerHTML = `
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
    type KeyFeaturesHead = keyof typeof this.cardFeaturesHeads;
    Object.keys(features).forEach((key) => {
      const value = features[key as KeyFeatures];
      const cardBlock = createElement('div', 'card__features-block');
      const cardBlockHead = createElement('div', 'card__features-head' , this.cardFeaturesHeads[key as KeyFeaturesHead]);
      const cardBlockValue = createElement('div', 'card__features-value', value as string);
      cardBlock.append(cardBlockHead, cardBlockValue);
      featuresBottom.append(cardBlock);
    })
    cardPriceBlock.append(cardCount, btnCart, btnPay);
    featuresTop.append(cardValue, cardPriceBlock);
    cardData.append(cardTitle, featuresTop, featuresBottom);
    cardContainer.append(cardData, cardSlider);
    this.card.append(cardContainer);
  }
}

export default Card;