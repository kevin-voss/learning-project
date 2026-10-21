# Task 04_2 · Triangle: triangle detective

Part of [Exercise 04 · Branching](../README.md). New ideas you need: `boolean`, `&&`, `||`, tolerance. They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write `Triangle.java` yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

*(Translated into English from the course sheet.)*

Write a program that reads the side lengths of a triangle (in cm, with decimal places) and prints the following properties:

- Valid: a triangle is valid if no sum of two side lengths is smaller than or equal to the third side length.
- Equilateral: a triangle is equilateral if it is valid and all three side lengths are equal.
- Isosceles: a triangle is isosceles if it is valid and two side lengths are equal.
- Right-angled: a triangle is right-angled if it is valid and the equation c² = a² + b² holds, where c is the longest of the three sides.

Note that a triangle can have several properties at the same time, e.g. a triangle can be right-angled and isosceles at the same time. Equilateral triangles are always isosceles too.

Hint for testing: an example of a right-angled triangle is a triangle with the side lengths 3.0, 4.0 and 5.0 cm.

## The task, simply said

1. Ask for the three sides a, b, c (they can have a dot, like 3.5).
2. **Valid?** Any two sides together must be longer than the third one. (Try it with three pencils: if two are too short, they cannot meet at the top.)
3. **Equilateral?** Valid, and all three are the same.
4. **Isosceles?** Valid, and at least two are the same.
5. **Right-angled?** Valid, and longest × longest = the other two squared and added up.
6. Print all four answers with `true` / `false`. Several can be true at once.

## Test examples

Your program is right when it gives exactly these answers.

| a | b | c | Valid | Equilateral | Isosceles | Right-angled |
|---|---|---|-------|-------------|-----------|--------------|
| 3.0 | 4.0 | 5.0 | true | false | false | true |
| 5 | 3 | 4 | true | false | false | true (longest is first!) |
| 2 | 2 | 2 | true | true | true | false |
| 5 | 5 | 8 | true | false | true | false |
| 1 | 1 | 1.4142135623730951 | true | false | true | true |
| 1 | 2 | 3 | false | false | false | false |
| -3 | 4 | 5 | false | false | false | false |

## Little helpers

<details>
<summary>How do I find the longest side?</summary>

Start by guessing `c` is the longest. Then: if `a` is bigger than or equal to both others, it is `a`. Else if `b` is bigger than or equal to both others, it is `b`. Remember the two short sides too.

</details>

<details>
<summary>1, 1, 1.4142135623730951 says "not right-angled"</summary>

You compared doubles with `==`. Use `Math.abs(difference) < 0.000001` instead ([Exercise page](../README.md), part 11: "Doubles can tell tiny fibs").

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] You can say why the right-angle check needs a tolerance and the other checks do not.
- [ ] You can explain your code out loud in your own words.

Next: [Task 04_3](../task-04-3-date/README.md)
