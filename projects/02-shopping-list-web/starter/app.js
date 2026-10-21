// Shopping list: add items, tick them off, remove them.
// The array `items` is the truth. The page only shows what the array says.
// Follow step-by-step.md. Each TODO number is one step.

const STORAGE_KEY = 'shopping-list';

// TODO 1: find the four elements with document.querySelector:
//         #add-form, #item-input, #list and #count.
const form = null;
const input = null;
const list = null;
const count = null;

// TODO 5: replace [] with loadItems() so the saved list comes back.
let items = [];

// TODO 5: save the array. localStorage only stores text: use JSON.stringify.
function saveItems() {
}

// TODO 5: load the array. Return [] when nothing is saved yet (getItem gives null).
//         Otherwise turn the text back into an array with JSON.parse.
function loadItems() {
  return [];
}

// TODO 2: push a new object { name: name, done: false } into items, then call render().
function addItem(name) {
}

// TODO 4: flip items[index].done (true becomes false, false becomes true), then render().
function toggleItem(index) {
}

// TODO 4: remove the item at index with items.splice(index, 1), then render().
function removeItem(index) {
}

// TODO 3: draw the whole list from the array.
//   - empty the list: list.innerHTML = ''
//   - for each item: create an <li>, put the item's name in it, append it to the list
//   - TODO 4: give each <li> a checkbox and a remove button
function render() {

  // TODO 6: write the count into the #count paragraph, for example "4 items, 1 still to buy".
}

// TODO 2: listen for the form's 'submit' event.
//   - call event.preventDefault() so the page does not reload
//   - read input.value, trim it, and stop if it is empty
//   - call addItem(...) and clear the input

render();
