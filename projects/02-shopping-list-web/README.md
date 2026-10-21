# Project 2: Shopping list in the browser

Your first web page that **does** something. You type "Milk", press Add, and it is on the list. Tomorrow it is still there.

> [!PICTURE]
> A fridge door with a notepad. You write items on it, tick them off in the shop and tear off what you do not need. The notepad stays on the fridge, so the list is still there tomorrow. In this project the **array** is the notepad, the **page** is what you see on the fridge, and **localStorage** is the fridge door that keeps the note.

## What you build

A small web app with plain HTML, CSS and JavaScript. No libraries.

- Type an item and press **Add** (or Enter). It appears in the list.
- Tick an item off. It turns grey and crossed out.
- Remove an item with the ✕ button.
- A line at the bottom counts: "4 items, 1 still to buy".
- Reload the page: the list is still there.

## New in this project

| New skill | You already know (drills) |
|-----------|---------------------------|
| Find elements on the page (DOM) | Arrays: `push`, `filter`, loops |
| React to clicks and form submits (events) | Objects: `{ name: 'Milk', done: false }` |
| Save the list in the browser (localStorage) | Functions, `if` |

## What you need to know

- The [JavaScript drills](../../drills/javascript/README.md): arrays, objects, functions
- [DOM and events](../../sheets/javascript/dom.md): `querySelector`, `addEventListener`, `createElement`
- [JSON](../../sheets/javascript/json.md): `JSON.stringify` and `JSON.parse`

A word you do not know? Look it up in the [glossary](../../sheets/start/glossary.md).

## How this folder works

| File or folder | What it is for |
|----------------|----------------|
| [step-by-step.md](step-by-step.md) | The build guide in six steps. Each ends with "You should see …" |
| [starter/](starter/) | **Your desk.** `index.html` and `style.css` are ready. `app.js` has numbered `TODO`s for you |
| [solution/](solution/) | One finished app. Peek only when you are done or really stuck |

## The one big rule

> [!NOTE]
> **The array is the truth. The page is a mirror.** You never change the page by hand. You change the array, save it, and call `render()`. `render()` draws the whole list again from the array.

```text
click or submit  →  change the array  →  save it  →  render()
```

## Done when

- [ ] Typing an item and pressing Add (or Enter) puts it in the list.
- [ ] An empty input adds nothing.
- [ ] Ticking an item crosses it out. Ticking again brings it back.
- [ ] ✕ removes exactly that item.
- [ ] The count line is always right.
- [ ] After a reload, the list (with the ticks) is still there.
- [ ] Your work is committed and pushed on your branch.

> [!CHECK]
> 1. Why do we call `event.preventDefault()` in the submit listener?
>    <details><summary>Answer</summary>A form reloads the page when you submit it. <code>preventDefault()</code> stops that, so our JavaScript can handle the new item.</details>
> 2. localStorage only stores text. How do you store an array of objects?
>    <details><summary>Answer</summary>Turn it into text with <code>JSON.stringify(items)</code> before saving, and back into an array with <code>JSON.parse(text)</code> after loading.</details>
> 3. You tick "Milk". What happens, in order?
>    <details><summary>Answer</summary>The change listener calls <code>toggleItem(index)</code>. It flips <code>done</code> in the array, saves the array, and calls <code>render()</code>, which draws the list again with "Milk" crossed out.</details>

## Next

Start the [step-by-step guide](step-by-step.md). After this: [Project 3: tic-tac-toe](../03-tic-tac-toe/README.md) uses the same DOM and events for a game.
