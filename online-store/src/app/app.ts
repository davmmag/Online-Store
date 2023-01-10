import { searchFunction, sortingArray, minPriceFunc, maxPriceFunc, updatingShoppingCart  } from "../functions/functions";
import { productsArray } from "../app/products";
import { ProductDescription, ProductFilters } from "../types/types";
import { createTable, } from "../app/rendering";
import { slider } from "../app/slider";


let countryArray: string [] = [];
let brandArray: string [] = [];
let sortArray = productsArray;
const currentUrl = window.location.href;
//let sortingValue: string = 'priceAscending';
let filtersObj: ProductFilters = {
    price: [minPriceFunc(productsArray), maxPriceFunc(productsArray)],
    sorting: 'priceAscending'
};


function getUrlQuery() {
    const checkboxInput: NodeListOf<HTMLInputElement>  = document.querySelectorAll('.checkbox-input');
    
    const urlPage = window.location.href;

    function toFilterObj (newUrl: string) {
        const newObj = filtersObj;
        const newURL = new URL(newUrl);
        const searchParams = newURL.searchParams;
      
        if (searchParams.get('minprice')) {
            const minPrice = Number (searchParams.get('minprice'));
            newObj.price[0] = minPrice;
        }

        if (searchParams.get('maxprice')) {
            const maxPrice = Number (searchParams.get('maxprice'));
            newObj.price[1] = maxPrice;
        }
        
        if (searchParams.get('country')) {
            const newCountry = searchParams.get('country');
            newObj.country = newCountry?.split("+");
        }
        if (searchParams.get('brand')) {
            const newBrand = searchParams.get('brand');
            newObj.brand = newBrand?.split("+");
        }
        if (searchParams.get('sorting')) {
            const newSort = searchParams.get('sorting');
            if (newSort) {
                newObj.sorting = newSort;
            }
            
        }
        return newObj;
    }
    
    filtersObj = toFilterObj(urlPage);
    filtered();
    slider(filtered());
    checkboxInput.forEach((el) => {
        if (filtersObj.country) {
            if (filtersObj.country.includes(el.value)){
                el.checked = true;
            }
        }
        if (filtersObj.brand) {
            if (filtersObj.brand.includes(el.value)){
                el.checked = true;
            }
        }               
    });
    
    const sortInput: NodeListOf<HTMLOptionElement> = document.querySelectorAll(".select-input");
    sortInput.forEach((el) => {
        if (filtersObj.sorting === el.value) {
            el.selected = true;
        }
    })
    
    if (filtersObj.sorting) {
        let sortValue = filtersObj.sorting;
        if (sortValue) {
            createTable(sortingArray (filtered(), sortValue));
        }

    }
    
}

function checked () {
    const clickFilters: NodeListOf<Element> = document.querySelectorAll('.filters-buttons');
    let checkboxes: NodeListOf<Element> = document.querySelectorAll('.checkbox-input');
    
    for (let i= 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener('change', function(event) {
            
            if (event.target instanceof HTMLInputElement) {
                if (event.target.checked) {
                    if (event.target.form?.className === "checkboxes-country") {                           
                        countryArray.push(`${event.target.value}`) ;                      
                        filtersObj.country = countryArray;
                        filtered();
                        slider(filtered());
                    }         
                    if (event.target.form?.className === "checkboxes-brand") {
                        brandArray.push(`${event.target.value}`);
                        filtersObj.brand = brandArray;
                        filtered();
                        slider(filtered());
                        
                    }
                    clickFilters.forEach((el) => el.classList.add('active'));

                } else {
                    if (event.target.form?.className === "checkboxes-country") {
                        let deleteCountry = `${event.target.value}`;
                        countryArray = countryArray.filter((name) => name !== deleteCountry);
                        filtersObj.country = countryArray;
                        filtered();
                        slider(filtered());
                        
                    }         
                    if (event.target.form?.className === "checkboxes-brand") {
                        let deleteBrand = `${event.target.value}`;
                        brandArray = brandArray.filter((name) => name !== deleteBrand);
                        filtersObj.brand = brandArray;
                        filtered();
                        slider(filtered());
                        
                    }
                }
            }
        });
    }
}

function filtered () {
    let newArr: ProductDescription[] = sortArray;

    if (filtersObj.country?.length) {
        newArr = newArr.filter(el => filtersObj.country?.includes(el.country));
    }
    if (filtersObj.brand?.length) {
        newArr = newArr.filter(el => filtersObj.brand?.includes(el.brand));
    }
    if (filtersObj.price.length) {
        newArr = newArr.filter(el => el.price >= filtersObj.price[0]);
    }
    if (filtersObj.price.length) {
        newArr = newArr.filter(el => el.price <= filtersObj.price[1]);
    }
    createTable(newArr);


    function sortered () {
        createTable(sortingArray (newArr, filtersObj.sorting));
        const selectSort = document.querySelector('.select-box') as HTMLInputElement;
        if (selectSort) {
            selectSort.onchange = function() {
                filtersObj.sorting = selectSort.value;
                createTable(sortingArray (newArr, filtersObj.sorting));
            };
        }
    }
    sortered ();

    function sumofChange (arr: ProductDescription[]) {
        const presentValue: NodeListOf<Element> = document.querySelectorAll('.checkbox-label');
        presentValue.forEach (el => {
            const valElem = el.childNodes[0] as HTMLInputElement;
            let sum = 0;
                arr.forEach(el => {
                    if (Object.values(el).includes(valElem.value)) {
                        sum++;
                    }
                });
            let checkboxValue = el.childNodes[2].childNodes[0] as HTMLInputElement
            checkboxValue.innerText = `${sum}`;
        });
    }
    sumofChange(newArr);

    function search() {
        let searchInput: HTMLInputElement | null = document.querySelector('.header-input');
        let searchArr;
        if (searchInput){
            searchInput.oninput = function (){
                let valThis = this as HTMLInputElement;
                let val = valThis.value.trim();
                console.log (val);
                searchArr = newArr.filter((el) => {
                    if (el.country.toLowerCase().includes(val.toLowerCase()) || 
                        el.brand.toLowerCase().includes(val.toLowerCase()) || 
                        el.title.toLowerCase().includes(val.toLowerCase()) || 
                        el.surface.toLowerCase().includes(val.toLowerCase()) || 
                        el.drawing.toLowerCase().includes(val.toLowerCase())) {
                        return true;
                    }  else {
                        return false;
                    }
                })
                createTable(searchArr);
                sumofChange (searchArr);
            }
        }
    
        let inputText = document.querySelector('.header-button') as HTMLInputElement;
        inputText?.addEventListener('click', e => {
            search();
        })
        
    }
    search();
    return newArr;
}

function viewDisplay(view: string){
    if (view === 'table') {
        document.querySelector('.view-mode__table')?.classList.add ('view-active');
        const productItem: NodeListOf<Element> = document.querySelectorAll('.product-item');
        productItem.forEach (elem => {
            if (elem instanceof HTMLDivElement) {
                elem.style.flexDirection = 'column';
                elem.style.width = '33.333%';
            }
            if (elem.childNodes[1].childNodes[2] instanceof HTMLDivElement) { 
                elem.childNodes[1].childNodes[2].style.width = '100%';                  
            }
        })
    }
    if (view === 'list') {
        document.querySelector('.view-mode__list')?.classList.add ('view-active');
        const productItem: NodeListOf<Element> = document.querySelectorAll('.product-item');
        productItem.forEach (elem => {
            if (elem instanceof HTMLDivElement) {
                elem.style.flexDirection = 'row';
                elem.style.width = '100%';
                if (elem.childNodes[0] instanceof HTMLImageElement) {
                    elem.childNodes[0].style.maxWidth = '200px';
                    elem.childNodes[0].style.marginRight = '20px';
                }
                if (elem.childNodes[1].childNodes[2] instanceof HTMLDivElement) { 
                    elem.childNodes[1].childNodes[2].style.width = '50%';                  
                }
            }
        })
    }
}

function changeView () {
    document.querySelector('.view-mode__table')?.addEventListener('click', () => {
        document.querySelector('.view-mode__list')?.classList.remove ('view-active');
        viewDisplay('table');
    });

    document.querySelector('.view-mode__list')?.addEventListener('click', () => {
        document.querySelector('.view-mode__table')?.classList.remove ('view-active');
        viewDisplay('list');
    });
}

function productSelection() {
    const tableProducts = document.querySelector('.table__products');
    if (tableProducts instanceof HTMLElement) {
        tableProducts.addEventListener('click', (event) => {
            if (event.target instanceof HTMLElement) {
                const titleProduct = event.target.textContent;
                productsArray.forEach(element => {
                    if (element.title === titleProduct){
                        localStorage.setItem(`id`, `${element.id}`);
                    };
                });   
                if (event.target.classList.contains('product-button')) {
                  updatingShoppingCart(event.target, productsArray);
                }        
            }   
        })
    }
}

function filtersReset() {
    const filtersReset = document.querySelector('.filters-reset');
    const checkboxInput: NodeListOf<HTMLInputElement>  = document.querySelectorAll('.checkbox-input');
    filtersReset?.addEventListener('click', () => {
        filtersObj = {
            price: [minPriceFunc(productsArray), maxPriceFunc(productsArray)],
            sorting: 'priceAscending'
        };
        filtered ();
        checkboxInput.forEach((el) => {
            el.checked = false;
        });
        slider(productsArray);
    })
}

function filtersSave() {
    const filtersSave = document.querySelector('.filters-save');
    filtersSave?.addEventListener('click', () => {
            
            const paramObj = toUrlParams (filtersObj);
            const params = new URLSearchParams(paramObj);
            const fullUrl = currentUrl + '?' + params.toString();
            console.log (fullUrl);
            window.location.href = `${fullUrl}`;          
    }) 
}

function toUrlParams (filtersObj: ProductFilters) {
    let newObj: Record<string, string> = {
      minprice: `${filtersObj.price[0]}`,
      maxprice: `${filtersObj.price[1]}`,
    }
    
    if (filtersObj.country) {
      newObj.country = filtersObj.country.join('+');
    }
    if (filtersObj.brand) {
      newObj.brand = filtersObj.brand.join('+');
    }
    return newObj;
  }

export { 
    checked, 
    filtered, 
    //search, 
    filtersObj, 
    viewDisplay, 
    changeView, 
    productSelection, 
    filtersReset, 
    filtersSave, 
    getUrlQuery
}