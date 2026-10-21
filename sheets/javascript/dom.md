# The page tree: clicks and changes

> [!PICTURE]
> A web page is a **toy box with drawers**. The big box is the page. Inside are drawers (`<main>`, `<ul>`), and inside the drawers are toys (`<li>`, `<button>`). Like a family tree, every drawer has a parent and maybe children.
>
> This tree is called the **DOM**. JavaScript can open any drawer, read the label, change a toy, or put a new toy in.

## The idea

The browser reads your HTML and builds the DOM tree. JavaScript changes the tree, and the page changes right away.

| You want to … | You write |
|---|---|
| find one element | `document.querySelector('#title')` (CSS selector, like in your CSS file) |
| change its text | `element.textContent = 'Hi'` |
| make a new element | `document.createElement('li')` |
| put it on the page | `list.append(item)` |
| react to a click | `button.addEventListener('click', () => { … })` |
| switch a CSS class on and off | `element.classList.toggle('done')` |

An **event** is something that happens: a click, a key press, a form being sent. `addEventListener` says "when this happens, run this function".

A form reloads the whole page when you send it. `event.preventDefault()` stops that, so your JavaScript can handle it.

## Tiny example

```html
<form id="add-form">
  <input id="item-input" placeholder="Milk" />
  <button>Add</button>
</form>
<ul id="list"></ul>

<script>
  const form = document.querySelector('#add-form')
  const input = document.querySelector('#item-input')
  const list = document.querySelector('#list')

  form.addEventListener('submit', (event) => {
    event.preventDefault()                         // no page reload
    const item = document.createElement('li')
    item.textContent = input.value
    item.addEventListener('click', () => item.classList.toggle('done'))
    list.append(item)
    input.value = ''
  })
</script>
```

Type a word, press Enter, and it lands in the list. Click it to switch the class `done` on and off (give `.done` a line-through in CSS).

> [!TRY]
> You can change **any** page. Nothing breaks: a reload brings the page back.
>
> 1. Open any web page, for example this one. Open the console: **F12** (Mac: **Cmd + Option + J**).
> 2. Type `document.querySelector('h1').textContent = 'I changed this!'` and press Enter.
> 3. Type `document.body.append(document.createElement('hr'))` and press Enter. Scroll to the bottom.
> 4. Type `document.querySelector('h1').addEventListener('click', () => alert('Hi!'))`, then click the heading.
>
> You should see: the big heading says "I changed this!", a line at the bottom of the page, and a "Hi!" box when you click the heading.

> [!WARN]
> `querySelector` returns `null` when nothing matches. Then `.textContent` fails with "Cannot read properties of null". Check the `#id` spelling, and put your `<script>` at the **end** of `<body>` so the elements exist already.

> [!CHECK]
> 1. What is the DOM, in the toy box picture?
>    <details><summary>Answer</summary>The tree of drawers and toys: every element of the page, which JavaScript can read and change.</details>
> 2. Which two lines put a new `<li>` with the text "Eggs" into `list`?
>    <details><summary>Answer</summary><code>const li = document.createElement('li'); li.textContent = 'Eggs'</code> and then <code>list.append(li)</code>.</details>
> 3. Why do you call `event.preventDefault()` in a submit handler?
>    <details><summary>Answer</summary>Without it the browser reloads the page and your new list items are gone.</details>

**Next:** [JSON: data in a parcel](json.md), then [Project 2: shopping list in the browser](../../projects/02-shopping-list-web/README.md). Words you do not know are in the [glossary](../start/glossary.md).
