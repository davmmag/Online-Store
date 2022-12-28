import { createElement } from "../../functions/functions";
import { ProductTable,DataProduct } from "../../types/types";

class Product {
  product: HTMLElement;
  productFeaturesHeads: ProductTable;
  constructor() {
    this.product = document.querySelector('.product') as HTMLElement;
    this.productFeaturesHeads = {
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

  draw(data: DataProduct): void {
    const productContainer: HTMLElement = createElement('div', 'container product__container');
    const productData = createElement('div', 'product__data');
    const productTitle = createElement('h1', 'product__title', data.name);
    const featuresTop = createElement('div', 'product__features-top');
    const productValue = createElement('div', 'product__value', data.price);
    const productPriceBlock = createElement('div', 'product__price');
    const productCount = createElement('div', 'product__count count');
    productCount.innerHTML = 
    `
    <button class="btn btn count__minus">
                <i class="fa-solid fa-minus"></i>
              </button>
              <input type="text" class="count__value" placeholder="${data.features.packaging}" value="${data.features.packaging}">
              <button class="btn count__plus">
                <i class="fa-solid fa-plus"></i>
    </button>
    `
    const btnProduct = createElement('button', 'btn btn--circle product__btn-product');
    btnProduct.innerHTML = `
    <i class="fa-solid fa-product-shopping"></i>
              <span>Добавить в корзину</span>
    `;
    const btnPay = createElement('button', 'btn btn--circle product__btn-pay');
    btnPay.innerHTML = `
    <i class="fa-regular fa-credit-product"></i>
              <span>Купить сейчас</span>
    `
    const featuresBottom = createElement('div', 'product__features-bottom');
    const productSlider = createElement('div', 'product__slider');
    productSlider.innerHTML = `
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
    type KeyFeaturesHead = keyof typeof this.productFeaturesHeads;
    Object.keys(features).forEach((key) => {
      const value = features[key as KeyFeatures];
      const productBlock = createElement('div', 'product__features-block');
      const productBlockHead = createElement('div', 'product__features-head' , this.productFeaturesHeads[key as KeyFeaturesHead]);
      const productBlockValue = createElement('div', 'product__features-value', value as string);
      productBlock.append(productBlockHead, productBlockValue);
      featuresBottom.append(productBlock);
    })
    productPriceBlock.append(productCount, btnProduct, btnPay);
    featuresTop.append(productValue, productPriceBlock);
    productData.append(productTitle, featuresTop, featuresBottom);
    productContainer.append(productData, productSlider);
    this.product.append(productContainer);
  }
}

export default Product;