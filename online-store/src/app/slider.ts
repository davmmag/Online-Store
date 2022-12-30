function slider () {
 
  function getVals(){
    let parent = this.parentNode;
    let slides = parent.querySelectorAll("input");
      let slide1 = parseFloat( slides[0].value );
      let slide2 = parseFloat( slides[1].value );
    if( slide1 > slide2 ){ let tmp = slide2; slide2 = slide1; slide1 = tmp; }
    
    let displayElementMin = parent.querySelectorAll(".rangeValuesMin")[0];
    let displayElementMax = parent.querySelectorAll(".rangeValuesMax")[0];
        displayElementMin.innerHTML = slide1;
        displayElementMax.innerHTML = slide2;
  }
  
  window.onload = function(){
    let sliderSections = document.querySelectorAll(".range-slider");
        for( let x = 0; x < sliderSections.length; x++ ){
          let sliders = sliderSections[x].querySelectorAll("input");
          for( let y = 0; y < sliders.length; y++ ){
            if( sliders[y].type ==="range" ){
              sliders[y].oninput = getVals;
              sliders[y].oninput();
            }
          }
        }
  }
}

export { slider }