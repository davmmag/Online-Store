function createElement (type, parent, children, text) {
    const elParent = document.querySelector(`.${parent}`);
    if (elParent !== null) {
        const elem = document.createElement(`${type}`);
        elem.className = `${children}`;
        if (text !== undefined) {
            elem.innerHTML = `${text}`;
        }
        elParent.append(elem);
    }
}

function uniqueArray(array, key) {
    let tmpArray = [];
    
    function itemCheck(item) {
        if (tmpArray.indexOf(item[key]) === -1) {
            tmpArray.push(item[key]);
            return true;
        }
        return false;
    }
    array.filter((item) => itemCheck(item));
  return tmpArray.sort();
}

export { createElement, uniqueArray };