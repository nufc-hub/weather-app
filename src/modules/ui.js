class UI {
  constructor(selectorsIDs, selectorClasses) {
    this.elements = {};

    for (const key in selectorsIDs) {
      if (selectorsIDs.hasOwnProperty(key)) {
        this.elements[key] = document.getElementById(selectors[key]);
      }
    }

    for (const key in selectorClasses) {
      if (selectorClasses.hasOwnProperty(key)) {
        this.elements[key] = document.querySelectorAll(selectorClasses[key]);
      }
    }
  }

  updateTextContent(elementKey, newTextContent) {
    const element = this.elements[elementKey];

    if (element) {
      element.textContent = newTextContent;
    }
  }

  // Sets the src value in the html element.
  setSrc(elementKey, srcLink) {
    const element = this.elements[elementKey];

    if (element) {
      element.src = srcLink;
    }
  }
}

export default UI;
