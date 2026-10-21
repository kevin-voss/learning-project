# Drill: objects

> [!PICTURE]
> A passport. It is one thing, but it has many labelled fields: name, date of birth, nationality. You look up a field by its label. An object is the same: one value that holds several labelled values.

## The idea

An **object** groups values under names, in curly braces.

- Each pair `firstName: "Ada"` is a **field**: a **key** (the label) and a **value**.
- Read a field with a dot: `person.firstName`. Or with brackets and a string: `person["firstName"]`.
- `Object.keys(person)` gives an array of all the labels.
- `{ ...person, age: 37 }` makes a **copy** with one field changed. The old object stays the same.
- An array can hold objects: a shopping cart is a list of items, each item a small object.

## Tiny example

```javascript
const person = { firstName: "Ada", lastName: "Lovelace", age: 36 };

person.firstName;             // "Ada"
person["age"];                // 36
Object.keys(person);          // ["firstName", "lastName", "age"]

const older = { ...person, age: person.age + 1 };
older.age;                    // 37
person.age;                   // still 36
```

> [!TRY]
> 1. Open the browser console (F12) and paste the first line of the example.
> 2. Type `person.lastName` and press Enter.
> 3. Then solve Task 1 in `drills/javascript/objects/tasks.js` and run `make objects-task-01`.
> You should see: `"Lovelace"` in the console, then `1 pass` in green.

## Run this topic's tests

```bash
make objects            # all 10 tasks
make objects-task-08    # only task 8
```

No `make`? Run `bun test ./drills/javascript/objects/` instead.

## The tasks

1. Full name from a person
2. Next patch version (new object)
3. How many fields? (`Object.keys`)
4. Is the field there? (`in`)
5. Title and author
6. Make a point `{ x, y }`
7. One year older (new object)
8. Shopping cart total (loop over objects)
9. Sorted field names
10. Add two points

> [!CHECK]
> 1. `const pet = { name: "Rex", legs: 4 }`. How do you read the number of legs?
>    <details><summary>Answer</summary>`pet.legs` (or `pet["legs"]`). It gives `4`.</details>
> 2. What is `Object.keys(pet).length`?
>    <details><summary>Answer</summary>`2`. The object has two fields: `name` and `legs`.</details>
> 3. After `const copy = { ...pet, legs: 3 }`, how many legs does `pet` have?
>    <details><summary>Answer</summary>Still `4`. The spread made a new object; only `copy` has 3.</details>

**Next:** you finished the drills. Go back to the [learning path](../../../hub/index.html) for the next step.
