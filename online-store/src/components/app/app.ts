import {productsArray} from '../products/products';
const main = document.querySelector(".main") as HTMLElement;

class App {
    constructor () {
    }

    start (){
        let divCreate = document.createElement('div') as HTMLElement;
        divCreate.className = "products-table";
        divCreate.innerHTML = "Hello Products Table";
        main.append(divCreate);
            
        const productsTable = document.querySelector('.products-table') as HTMLElement;
        divCreate = document.createElement('div') as HTMLElement;
        divCreate.className = "product-info";
        divCreate.innerHTML = "Hello Product-Info";
        productsTable.append(divCreate);

        const productInfo = document.querySelector('.product-info') as HTMLElement;
        divCreate = document.createElement('div') as HTMLElement;
        divCreate.className = "product-info__image-box";
        divCreate.innerHTML = "Hello Product-Image";
        productInfo.append(divCreate);

        const productImg = document.querySelector('.product-info__image-box') as HTMLImageElement;
        const imgCreate = document.createElement('img');
        imgCreate.src = 'src/img/keramogranit-qua-60x120-sun-onyx-full-lap (1).jpg';
        productImg.appendChild(imgCreate);
    }

}

export default App;