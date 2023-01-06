import { returnElement, countPackage, createCountPackage } from "../../functions/functions";
import { ProductTable, ProductDescription } from "../../types/types";
import ModalZoom from "../modal/modal-zoom";
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
    };
  }

  draw(data: ProductDescription | undefined): void {
    if (data) {
      const { title, price, packaging, weight } = data;
      const productContainer: HTMLElement = returnElement('div', 'container product__container');
      const productImages = this.fillingImages(data);
      const productData = returnElement('div', 'product__data');
      const productTitle = returnElement('h1', 'product__title', title);
      const featuresTop = returnElement('div', 'product__features-top');
      const productValue = returnElement('div', 'product__value', `${price}`);
      const productPriceBlock = returnElement('div', 'product__price');
      const productCount = createCountPackage('product', packaging, weight);
      const breadcrumbs = document.querySelector('.breadcrumbs__link--title') as HTMLLinkElement;
      breadcrumbs.textContent = data.title;
      // const btnRemove = returnElement('button', 'btn btn count__minus', '-');
      // const inputValue = returnElement('input', 'count__value', '', {
      //   type: 'text',
      //   placeholder: `${packaging}`,
      //   value: `${packaging}`,
      // });
      // const btnAdd = returnElement('button', 'btn btn count__plus', '+');
      // btnRemove.addEventListener('click', (e: Event) => countPackage(packaging, weight, e));
      // btnAdd.addEventListener('click', (e: Event) => countPackage(packaging, weight, e));
      // productCount.append(btnRemove, inputValue, btnAdd);
      const btnProduct = returnElement(
        'button',
        'btn btn--circle product__btn-product',
        'Добавить в корзину',
      );
      const btnPay = returnElement('button', 'btn btn--circle product__btn-pay', 'Купить сейчас');
      const featuresBottom = returnElement('div', 'product__features-bottom');
      const featuresBlocks = this.fillingProperties(data);
      featuresBottom.append(...featuresBlocks);
      productPriceBlock.append(productCount, btnProduct, btnPay);
      featuresTop.append(productValue, productPriceBlock);
      productData.append(productTitle, featuresTop, featuresBottom);
      productContainer.append(productData, productImages);
      this.product.append(productContainer);
    }
  }

  fillingProperties(data: ProductDescription): HTMLElement[] {
    const keys = Object.keys(this.productFeaturesHeads);
    type KeyFeaturesHead = keyof typeof this.productFeaturesHeads;
    const { width, height } = data.size;
    const blocksArray: HTMLElement[] = [];
    for (const key of keys) {
      const productBlock = returnElement('div', 'product__features-block');
      const productBlockHead = returnElement('div', 'product__features-head',this.productFeaturesHeads[key as KeyFeaturesHead]);
      const productBlockValue = returnElement('div', 'product__features-value');
      if (key === 'size') productBlockValue.textContent = `${width}x${height}`;
      else productBlockValue.textContent = `${data[key as KeyFeaturesHead]}`;
      productBlock.append(productBlockHead, productBlockValue);
      blocksArray.push(productBlock);
    }
    return blocksArray;
  }

  fillingImages(data: ProductDescription): HTMLElement {
    const { images } = data;
    const productImages = returnElement('div', 'product__images');
    const productImagesTop = returnElement('div', 'product__images-top');
    const productImagesBottom = returnElement('div', 'product__images-bottom');
    for (let i = 0; i < images.length; i++) {
      const zoom = returnElement('a', 'zoom');
      const image = returnElement('img', 'img product__img') as HTMLImageElement;
      image.src = `${images[i]}`;
      image.addEventListener('click', () => new ModalZoom().create(image.src));
      zoom.append(image);
      if (i === 0) {
        productImagesTop.append(zoom);
      } else {
        const productImagesBlock = returnElement('div', 'product__images-block');
        productImagesBlock.append(zoom);
        productImagesBottom.append(productImagesBlock);
      }
    }
    productImages.append(productImagesTop, productImagesBottom);
    return productImages;
  }

  countPackage(packaging: string, weight: string, e: Event): void {
    const target = e.target as HTMLButtonElement;
    const flag = target.classList.contains('count__plus');
    const inputValue = document.querySelector('.count__value') as HTMLInputElement;
    if (flag === true) {
      const result = `${+inputValue.value + +packaging}`;
      inputValue.value = result;
    } else {
      const result = `${+inputValue.value - +packaging}`;
      if (+result > 0) inputValue.value = result;
    }
  }
}

export default Product;
