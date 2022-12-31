import { ProductFilters } from "./types";
import { minPriceFunc, maxPriceFunc } from "./functions"
import { filtered } from "./app"

let filtersObj: ProductFilters = {
  price: [minPriceFunc(), maxPriceFunc()],
};

function slider () {

  let displayElementMin = document.querySelectorAll(".rangeValuesMin")[0];
  let displayElementMax = document.querySelectorAll(".rangeValuesMax")[0];
    displayElementMin.innerHTML = `${filtersObj.price[0]}`;
    displayElementMax.innerHTML = `${filtersObj.price[1]}`;

  function getVals() {
    let slides = document.querySelectorAll(".slider-input") as NodeListOf<HTMLInputElement>;
    let slide1 = parseFloat( slides[0].value );
    let slide2 = parseFloat( slides[1].value );
    if( slide1 > slide2 ){ let tmp = slide2; slide2 = slide1; slide1 = tmp; }
        displayElementMin.innerHTML = `${slide1}`;
        displayElementMax.innerHTML = `${slide2}`;
        if (filtersObj.price) {
          filtersObj.price[0] = slide1;
          filtersObj.price[1] = slide2;
        }
        filtered ()
  }
  
  window.onload = function(){
    let sliderSections = document.querySelectorAll(".range-slider");
        for( let x = 0; x < sliderSections.length; x++ ){
          let sliders = sliderSections[x].querySelectorAll(".slider-input") as NodeListOf<HTMLInputElement>;
          if (sliders) {
            for( let y = 0; y < sliders.length; y++ ){
              if( sliders[y].type === "range" ){
                sliders[y].oninput = getVals;
              }
            }
          }

        }
  }
}

export { slider, filtersObj }