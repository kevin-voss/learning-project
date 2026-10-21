# Task 01_2 · Indentation

Part of [Exercise 01 · First programs](../README.md). New ideas you need: blocks `{ }` and indenting, `println`. They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write `Task01_2.java` yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

*(Translated into English from the course sheet.)*

Enter the following program in a file named `Task01_2.java` and format it. Pay particular attention to consistent indentation of all blocks.

```java
public class Task01_2 { 

    public static void main(String[] args) { 
        
        System.out.println("A"); { 
            System.out.println("B"); 
            System.out.println("C"); { 
                System.out.println("D"); { 
                    System.out.println("E"); 
                    System.out.println("F"); 
                    System.out.println("G"); 
                } 
                System.out.println("H"); 
            } 
        } 
        System.out.println("I"); { { 
            System.out.println("L"); 
        } } 
    }
}
```

## The task, simply said

1. Type (or copy) the program into a new file `Task01_2.java` on your desk.
2. Run it once and write down what it prints. That is your "before" picture.
3. Find every box: every `{` and its partner `}`.
4. Give every `{` and every `}` a clean place, and indent every line by 4 spaces per box it is in.
5. Run it again. The output must be **exactly the same** as before. You only moved spaces and line breaks.

## Test examples

Your program is right when it gives exactly these answers.

| You run | The program says |
|---------|------------------|
| `java Task01_2` before tidying | `A` `B` `C` `D` `E` `F` `G` `H` `I` `L`, each on its own line |
| `java Task01_2` after tidying | exactly the same 10 lines. Not one letter more or less |

And a test for your eyes: in your tidy version, every `}` stands **straight below** the first letter of the line that opened its box. If you put a ruler down from a `}` upwards, the first thing it hits is the line with the matching `{`.

Did you notice? There is no `J` and no `K`. The sheet just skips them. Do not add them: tidying never changes what a program does.

## Your first try

What is already good:

- The big boxes are now clearly visible: every inner box sits 4 spaces further right, and `B` to `H` are easy to follow.
- You moved the `{` that was glued behind `println("A")` onto its own line, so nobody thinks it belongs to the `println`.

What is still open:

- Look at the end of your program, around `I` and `L`: one line still holds two boxes at once. Give each box its own lines, like you did above.
- Run your version and the sheet's version and compare the output line by line. Yours prints one thing the sheet's program does not print. Find the line that does it.

## Little helpers

<details>
<summary>How do I find which } belongs to which {?</summary>

Count like stairs. Go through the program from the top. Every `{` = one step up, every `}` = one step down. The `}` that brings you back to the same step closes that box. In Cursor: click right behind a `{`, and its partner lights up.

</details>

<details>
<summary>What is that { doing after println("A"); ?</summary>

Nothing special! It opens an extra box that has no name and no rule. Java just walks into it and runs the lines inside. That is why it is so confusing on the same line: it looks like it belongs to the `println`, but it does not.

</details>

<details>
<summary>Is there a button that does it for me?</summary>

Yes: in Cursor or VS Code, "Format Document" (Shift+Option+F on a Mac). Do it **by hand first**, so you learn to see boxes. Then press the button and compare.

</details>

## Done when

- [ ] Your program prints the same 10 lines as the original.
- [ ] Every `{` and every `}` has its own clear place, and every box is indented 4 spaces more than its parent.
- [ ] You can point at any line and say how many boxes deep it sits.
- [ ] You can explain your code out loud in your own words.

Next: [Task 01_3](../task-01-3-stars/README.md)
