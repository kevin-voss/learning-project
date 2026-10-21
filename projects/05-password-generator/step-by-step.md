# Password generator: step by step

> [!PICTURE]
> You build the program like a sandwich: bread first (it runs), then one layer at a time.
> After every layer you run it and taste it.

Do one step, run the program, and see the result. Then go to the next step.

## Step 1: Get the starter running

1. Make a folder for your work, for example `my-password` inside your own branch.
2. Copy `starter/Main.java` and `starter/PasswordGenerator.java` into it.
3. In the terminal, go into that folder and run:

```bash
javac *.java
java Main
```

4. Type `10` and press Enter.

You should see: `Length (8-32): ` and then an empty line. The password is still empty. That is fine.

> [!NOTE]
> `javac *.java` compiles every `.java` file in the folder. `java Main` runs the class that has `main`.
> No `package` line is needed for a small program like this.

## Step 2: Read the length with Scanner

`Scanner` reads what the person types. `nextLine()` waits until Enter and gives you the whole line as a `String`.

```java
Scanner input = new Scanner(System.in);
System.out.print("Your name: ");
String name = input.nextLine().trim();   // trim() removes spaces at both ends
System.out.println("Hello " + name);
```

Now finish `isWholeNumber` and `askLength`:

1. `isWholeNumber`: return `false` for `""` or a text longer than 3 characters. Then check every character with `Character.isDigit`.
2. `askLength`: put the question in a `while (true)` loop. A good number is returned. A bad one prints `Length must be from 8 to 32.` and the loop runs again.
3. Run it. Type `7`, then `abc`, then press Enter on an empty line, then `12`.

You should see: the message three times, then the program goes on.

> [!WARN]
> Do not call `Integer.parseInt` before you know the text is digits. `Integer.parseInt("abc")` crashes the program.

## Step 3: Ask yes or no

1. Finish `askYesNo`. It looks like `askLength`, but the good answers are `"y"` (return `true`) and `"n"` (return `false`).
2. In `main`, replace the three `false` values with three calls:

```java
boolean uppercase = askYesNo(input, "Uppercase (y/n): ");
```

3. Run it and type `yes` for the first question.

You should see: `Please type y or n.` and the same question again.

> [!NOTE]
> Compare text with `equals`, never with `==`. `line.equals("y")` checks the letters. `==` checks if it is the very same object.

## Step 4: Pick random characters

`Random` gives random numbers. `nextInt(n)` returns a number from `0` up to `n - 1`.

```java
Random random = new Random();
int index = random.nextInt(26);          // 0, 1, ... 25
char letter = "abcdefghijklmnopqrstuvwxyz".charAt(index);
```

1. In `pick`, return the character at a random index of `pool`.
2. In `generate`, add a `while` loop: as long as `password.length() < length`, do `password.append(pick(pool))`.
3. Run it with length `12`.

You should see: 12 random small letters, like `qhzbwmoaykte`.

> [!NOTE]
> A `StringBuilder` is a string you can change. `append` adds a character at the end. `toString()` turns it back into a normal `String`.

## Step 5: Every chosen kind at least once

1. Before the `while` loop, append one `pick(LOWERCASE)`.
2. If `uppercase` is `true`: append one `pick(UPPERCASE)` and add `UPPERCASE` to the pool (`pool = pool + UPPERCASE;`).
3. Do the same for digits and specials.
4. Run it with length `8` and three `y`.

You should see: 8 characters. The first four are one small letter, one big letter, one digit, one sign, like `kR4!mqzb`. They are not mixed yet.

## Step 6: Shake the bag

Shuffle means: go from the last position down to 1. Swap each character with a random one at the same or an earlier position.

```java
char temp = text.charAt(i);
text.setCharAt(i, text.charAt(j));
text.setCharAt(j, temp);
```

1. Write the loop in `shuffle`. Use `int j = random.nextInt(i + 1);`.
2. Call `shuffle(password);` at the end of `generate`.
3. Run it three times with the same answers.

You should see: three different passwords, with the kinds mixed everywhere.

> [!TRY]
> Run with length `8` and all `n`.
> You should see: 8 small letters only. No digit, no big letter, no sign.

## Step 7 (extra): How strong is it?

Add a method `strength(String password)` to `PasswordGenerator`. Count how many kinds are in the password. Then return `weak`, `medium` or `strong` (rules in the [README](README.md)). Print it in `main`.

You should see: `Strength: weak` for length 8, and `Strength: strong` for length 16 with all `y`.

> [!CHECK]
> 1. What does `input.nextLine()` return when the person only presses Enter?
>    <details><summary>Answer</summary>An empty string: <code>""</code>. Your check must refuse it.</details>
> 2. Why do you make `Random` once, as a field, and not in every call of `pick`?
>    <details><summary>Answer</summary>One Random is enough and can be reused. Making a new one every time is wasted work.</details>
> 3. In the shuffle, why is it <code>nextInt(i + 1)</code> and not <code>nextInt(i)</code>?
>    <details><summary>Answer</summary>The character may also stay where it is. <code>nextInt(i + 1)</code> includes position <code>i</code>.</details>

Stuck? Compare with [solution/PasswordGenerator.java](solution/PasswordGenerator.java) and [solution/Main.java](solution/Main.java).

**Next:** back to the [project page](README.md) and tick the "Done when" list.
