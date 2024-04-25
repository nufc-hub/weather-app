class UI {
  constructor(selectors) {
    this.elements = {};

    // Loops through selectors.
    for (const key in selectors) {
      // Gets all the element names from the selectors object.
      if (selectors.hasOwnProperty(key)) {
        this.elements[key] = document.getElementById(selectors[key]);
      }
    }
  }

  // Update element text content.
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
