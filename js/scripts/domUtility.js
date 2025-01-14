// Generalized function to streamline creating an element with optional id, classes, and text
function newElement(type, text = null, id = null, classes = []) {
  const element = document.createElement(type);

  // Set the text content if any is provided
  if (text) element.textContent = text;

  // Set the id of the new element if provided
  if (id) element.id = id;

  // Set the classes for the new element if any are provided
  if (classes.length > 0) {
    classes.forEach((cls) => element.classList.add(cls));
  }
  return element;
}

// Function to streamline creating an image element with optional parameters
function newImg(src = null, alt = null, id = null, classes = []) {
  const img = document.createElement("img");

  // Set the src attribute if provided
  if (src) img.src = src;

  // Set the alt attribute if provided
  if (alt) img.alt = alt;

  // Set the id if provided
  if (id) img.id = id;

  // Set the classes if provided
  if (classes.length > 0) {
    classes.forEach((cls) => img.classList.add(cls));
  }
  return img;
}

// Function to streamline creating an input element with optional parameters
function newInput(type, id = null, classes = [], name) {
  const inp = document.createElement("input");

  inp.type = type;

  // Set the id of the new element if provided
  if (id) inp.id = id;

  // Set the classes for the new element if any are provided
  if (classes.length > 0) {
    classes.forEach((cls) => inp.classList.add(cls));
  }

  if (name) inp.name = name;
  return inp;
}

// Function to streamline creating a label
function newLabel(isFor, text = null, id = null, classes = []) {
  const label = document.createElement("label");

  // Set the for
  label.htmlFor = isFor;

  // Set the text content if any is provided
  if (text) label.textContent = text;

  // Set the id of the new element if provided
  if (id) label.id = id;

  // Set the classes for the new element if any are provided
  if (classes.length > 0) {
    classes.forEach((cls) => label.classList.add(cls));
  }
  return label;
}
