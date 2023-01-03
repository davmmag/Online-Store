const returnElement = (selector: string, name: string, text?: string, attrs?: object) => {
  const element = document.createElement(selector);
  element.className = name;
  if (text) element.textContent = text;
  if (attrs) {
    type Key = keyof typeof attrs;
    for (const key in attrs) {
      element.setAttribute(key, attrs[key as Key]);
    }
  }
  return element;
}

export { returnElement };