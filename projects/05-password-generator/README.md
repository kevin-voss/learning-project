# Project 5: Password generator

> [!PICTURE]
> Think of four jars of sweets: small letters, big letters, numbers and funny signs.
> You take one sweet from every jar you want, fill the bag with more random sweets, then shake the bag.
> The bag is your password.

Your first real Java program. It asks a few questions in the terminal and prints a fresh, random password.

## What you build

```text
Length (8-32): 12
Uppercase (y/n): y
Digits (y/n): y
Special characters (y/n): n
q7RkaM2xPb9w
```

Your password looks different, because it is random. Run it again and you get a new one.

Two classes, two jobs:

| File | Job |
|---|---|
| `Main.java` | Asks the questions with `Scanner` and prints the password. |
| `PasswordGenerator.java` | Builds the password with `Random`. It never reads the keyboard. |

## What you need to know

You know these from the Java path:

- [Methods](../../tracks/java/topics/methods/index.html): a method takes inputs and returns one answer.
- [Strings](../../tracks/java/topics/strings/index.html): `charAt`, `length`, `"a"` versus `'a'`.
- [Control flow](../../tracks/java/topics/control-flow/index.html): `while`, `for`, `if`.
- [Classes and objects](../../tracks/java/topics/classes-and-objects/index.html): `new PasswordGenerator()`.

Two things are new. The [step-by-step guide](step-by-step.md) shows them:

- `Scanner` reads a line the person types.
- `Random` picks a random number.

## Rules

- The length must be a whole number from 8 to 32. Small letters are always in.
- A bad answer (`7`, `abc`, an empty line, `yes`) prints a short message and asks the same question again. No crash.
- Every kind you said `y` to appears at least once. A kind you said `n` to never appears.
- The kinds are mixed. `ABCabc12` is not mixed.

## Done when

- [ ] `javac *.java` and `java Main` work in your folder.
- [ ] Length `7`, `abc` and an empty line are refused, then `12` works.
- [ ] `yes` is refused. Only `y` or `n` are accepted.
- [ ] With all `n`, the password has only small letters.
- [ ] With all `y`, it has every kind at least once, mixed.
- [ ] Two runs with the same answers give two different passwords.

**Extra:** print `weak`, `medium` or `strong` under the password.
Weak: shorter than 12, or fewer than three kinds. Medium: at least 12 long with three kinds. Strong: at least 16 long with all four kinds.

## Files

- [step-by-step.md](step-by-step.md): build it in small steps.
- [starter/](starter/Main.java): two files with `TODO` comments. Copy them into your own folder and start there.
- [solution/](solution/Main.java): one finished answer. Look only after you tried.

> [!CHECK]
> 1. Why does `Main` not use `Random`?
>    <details><summary>Answer</summary>Each class has one job. Main talks to the person. PasswordGenerator builds the password. You could reuse PasswordGenerator in a web app without changing it.</details>
> 2. `random.nextInt(26)` can return which numbers?
>    <details><summary>Answer</summary>0 to 25. Never 26. That fits the 26 indexes of the alphabet string.</details>
> 3. Why do you put one character of every kind in first?
>    <details><summary>Answer</summary>A random fill could miss a kind by bad luck. Putting one of each in first makes sure every chosen kind is there.</details>

**Next:** [Project 6: Shopping list in Java](../06-shopping-list-java/README.md)
