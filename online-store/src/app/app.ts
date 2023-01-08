import { searchFunction, sortingArray, minPriceFunc, maxPriceFunc, toUrlParams  } from "../functions/functions";
import { productsArray } from "../app/products";
import { ProductDescription, ProductFilters } from "../types/types";
import { createTable, } from "../app/rendering";
import { slider } from "../app/slider";


let countryArray: string [] = [];
let brandArray: string [] = [];
let sortArray = productsArray;
let sortingValue: string = 'priceAscending';
let filtersObj: ProductFilters = {
    price: [minPriceFunc(productsArray), maxPriceFunc(productsArray)],
};


function getUrlQuery() {
    const checkboxInput: NodeListOf<HTMLInputElement>  = document.querySelectorAll('.checkbox-input');
    const params = new URLSearchParams(window.location.search);

    console.log(params.toString());
    if(localStorage.getItem("myFilters")) {
        let jsonFilters = localStorage.getItem("myFilters");
        if (jsonFilters) {
            filtersObj = JSON.parse(jsonFilters);
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
        } 
    }

    const sortInput: NodeListOf<HTMLOptionElement> = document.querySelectorAll(".select-input");
    sortInput.forEach((el) => {
        if (localStorage.getItem("mySort") === el.value) {
            el.selected = true;
        }
    })
    

    if (localStorage.getItem("mySort")) {
        let sortValue = localStorage.getItem("mySort");
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
        createTable(sortingArray (newArr, sortingValue));
        const selectSort = document.querySelector('.select-box') as HTMLInputElement;
        if (selectSort) {
            selectSort.onchange = function() {
                sortingValue = selectSort.value;
                createTable(sortingArray (newArr, sortingValue));
                localStorage.setItem("mySort", sortingValue);
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
        };
        filtered ();
        checkboxInput.forEach((el) => {
            el.checked = false;
        });
        slider(productsArray);
        let localObj = JSON.stringify(filtersObj);
        localStorage.setItem("myFilters", localObj);
    })
}

function filtersSave() {
    const filtersSave = document.querySelector('.filters-save');
    filtersSave?.addEventListener('click', () => {
            const paramObj = toUrlParams (filtersObj);
            console.log (paramObj);
            const params = new URLSearchParams(paramObj);
            const url = 'http://192.168.0.103:3000/';
            const postUrl = new URL("posts", url);
            postUrl.search = params.toString();
            console.log (`${postUrl}`);
            //window.location.href = `${postUrl}`;
    }) 
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

/*
function getLocalStorage() {
    const checkboxInput: NodeListOf<HTMLInputElement>  = document.querySelectorAll('.checkbox-input');
    
    if(localStorage.getItem("myFilters")) {
        let jsonFilters = localStorage.getItem("myFilters");
        if (jsonFilters) {
            filtersObj = JSON.parse(jsonFilters);
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
        } 
    }

    const sortInput: NodeListOf<HTMLOptionElement> = document.querySelectorAll(".select-input");
    sortInput.forEach((el) => {
        if (localStorage.getItem("mySort") === el.value) {
            el.selected = true;
        }
    })
    

    if (localStorage.getItem("mySort")) {
        let sortValue = localStorage.getItem("mySort");
        if (sortValue) {
            createTable(sortingArray (filtered(), sortValue));
        }

    }
}
*/