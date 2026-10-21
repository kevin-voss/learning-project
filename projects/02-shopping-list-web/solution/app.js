// Shopping list: add items, tick them off, remove them.
// The array `items` is the truth. The page only shows what the array says.

const STORAGE_KEY = 'shopping-list';

// 1. Find the elements on the page.
const form = document.querySelector('#add-form');
const input = document.querySelector('#item-input');
const list = document.querySelector('#list');
const count = document.querySelector('#count');

// 2. The state: one object per item, for example { name: 'Milk', done: false }.
let items = loadItems();

// 3. Save and load. localStorage only stores text, so we use JSON.
function saveItems() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function loadItems() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === null) {
    return [];
  }
  return JSON.parse(saved);
}

// 4. Change the state. Every change: update the array, save, draw again.
function addItem(name) {
  items.push({ name: name, done: false });
  saveItems();
  render();
}

function toggleItem(index) {
  items[index].done = !items[index].done;
  saveItems();
  render();
}

function removeItem(index) {
  items.splice(index, 1); // remove 1 item at position index
  saveItems();
  render();
}

// 5. Draw the whole list from the array.
function render() {
  list.innerHTML = '';

  items.forEach((item, index) => {
    const li = document.createElement('li');
    if (item.done) {
      li.classList.add('done');
    }

    const label = document.createElement('label');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = item.done;
    checkbox.addEventListener('change', () => toggleItem(index));

    const name = document.createElement('span');
    name.textContent = item.name;

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = 'remove';
    removeButton.textContent = '✕';
    removeButton.setAttribute('aria-label', 'Remove ' + item.name);
    removeButton.addEventListener('click', () => removeItem(index));

    label.append(checkbox, name);
    li.append(label, removeButton);
    list.append(li);
  });

  const left = items.filter((item) => !item.done).length;
  count.textContent = items.length + ' items, ' + left + ' still to buy';
}

// 6. Listen for the form. preventDefault stops the page from reloading.
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = input.value.trim();
  if (name === '') {
    return;
  }

  addItem(name);
  input.value = '';
  input.focus();
});

// 7. Draw the saved list once when the page opens.
render();
