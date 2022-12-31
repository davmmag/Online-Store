function slider () {
  let displayElementMin = document.querySelectorAll(".rangeValuesMin")[0];
  let displayElementMax = document.querySelectorAll(".rangeValuesMax")[0];
    displayElementMin.innerHTML = `1000`;
    displayElementMax.innerHTML = `5000`;

  function getVals() {
    let slides = document.querySelectorAll(".slider-input") as NodeListOf<HTMLInputElement>;
    let slide1 = parseFloat( slides[0].value );
    let slide2 = parseFloat( slides[1].value );
    if( slide1 > slide2 ){ let tmp = slide2; slide2 = slide1; slide1 = tmp; }
        displayElementMin.innerHTML = `${slide1}`;
        displayElementMax.innerHTML = `${slide2}`;
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

export { slider }