const createElement = (selector: string, name: string, text?: string): HTMLElement => {
  const element = document.createElement(selector);
  element.className = name;
  if (text) element.textContent = text;
  return element;
}

export { createElement };