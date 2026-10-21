# Project 2: step by step

Six small steps. After each step, save, reload the browser and look. Do not write everything first and test at the end.

**Sheets:** [DOM and events](../../sheets/javascript/dom.md) · [JSON](../../sheets/javascript/json.md) · **Brief:** [README](README.md)

## Step 0: open your desk

From the repo root:

```bash
cd projects/02-shopping-list-web/starter
ls
```

You should see `index.html`, `style.css` and `app.js`. Open `index.html` in the browser. Open the **console** too: press F12 (or `Cmd+Option+J` on a Mac) and pick the Console tab. Errors show up there in red.

You should see a card with a title, an input and an Add button. The button does nothing yet.

## Step 1: find the elements

> [!PICTURE]
> The page is a tree of boxes (the **DOM**). `document.querySelector('#list')` walks the tree and hands you the box with the name tag `id="list"`.

Find `TODO 1` in `app.js`. Replace each `null`:

```js
const form = document.querySelector('#add-form');
```

Do the same for `input`, `list` and `count`. Then add one test line at the bottom of the file:

```js
console.log(form, input, list, count);
```

You should see four elements in the console, not `null`. Delete the test line again.

## Step 2: add an item

Find both `TODO 2`s.

1. In `addItem(name)`, push a new object into the array: `items.push({ name: name, done: false });`. Then call `render()`.
2. At the bottom, listen for the form:

```js
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = input.value.trim();
  if (name === '') {
    return;
  }
  addItem(name);
  input.value = '';
});
```

Nothing shows on the page yet, because `render()` is still empty. Check the array instead: type `items` in the console after you add "Milk".

You should see `[{ name: 'Milk', done: false }]`.

## Step 3: draw the list

> [!PICTURE]
> `render()` is a whiteboard. Each time, you wipe it clean and write the whole list again from the notepad (the array).

Find `TODO 3`. Fill in `render()`:

```js
list.innerHTML = '';
items.forEach((item, index) => {
  const li = document.createElement('li');
  li.textContent = item.name;
  list.append(li);
});
```

You should see each item appear under the input when you press Add or Enter. An empty input adds nothing.

## Step 4: tick off and remove

Find the `TODO 4`s.

1. Fill in `toggleItem(index)` and `removeItem(index)`. Both change the array and then call `render()`. `items.splice(index, 1)` removes one item at position `index`.
2. In `render()`, build each row from three parts instead of plain text: a checkbox, a `<span>` with the name, and a ✕ button.

```js
const checkbox = document.createElement('input');
checkbox.type = 'checkbox';
checkbox.checked = item.done;
checkbox.addEventListener('change', () => toggleItem(index));
```

Make the ✕ button the same way (`'click'` and `removeItem(index)`). Put the checkbox and the span inside a `<label>` so a click on the name ticks it too. Add the class `done` to the `<li>` when `item.done` is true: the CSS crosses it out.

You should see a checkbox and a ✕ on every row. Ticking crosses the item out. ✕ removes exactly that item.

> [!WARN]
> Do not remove or tick the `<li>` directly. Change the array, then `render()`. If the page and the array disagree, the array wins on the next render.

## Step 5: save in localStorage

> [!PICTURE]
> localStorage is a small drawer in the browser that is still full after a reload. It only holds **text**, so you fold the array into text (JSON) before you put it in.

Find the three `TODO 5`s.

```js
function saveItems() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}
```

`loadItems()` does the opposite: `localStorage.getItem(STORAGE_KEY)`. If that is `null`, return `[]`. Otherwise return `JSON.parse(saved)`. Then start with `let items = loadItems();` and call `saveItems()` in `addItem`, `toggleItem` and `removeItem`, before `render()`.

You should see your list (with its ticks) come back after a reload.

> [!TRY]
> In DevTools open **Application → Local Storage** (Chrome) or **Storage → Local Storage** (Firefox). Click the page's address.
> You should see the key `shopping-list` with your array as text.

## Step 6: the count

Find `TODO 6` at the end of `render()`. Count all items and the ones still to buy:

```js
const left = items.filter((item) => !item.done).length;
count.textContent = items.length + ' items, ' + left + ' still to buy';
```

You should see the line change each time you add, tick or remove an item.

## Done

Check every box under "Done when" in the [README](README.md). Then compare with the [solution](solution/). Your code can look different and still be right.

Save your work:

```bash
git add projects/02-shopping-list-web/starter
git commit -m "Finish project 2: shopping list"
git push
```

> [!TRY]
> Extra ideas, only after everything works:
> 1. A "Clear ticked items" button (hint: `items.filter`).
> 2. Show "Your list is empty" when there are no items.
> 3. Add an amount to each item: `{ name: 'Apples', amount: 6, done: false }`.
