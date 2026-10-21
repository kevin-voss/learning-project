# Step 01: describe one parcel in Java

> [!PICTURE]
> Picture a parcel depot. Every parcel that comes in gets a **label card**: a number, a name, and a status like "just arrived". Today you write that label card in Java. One class, one parcel, one line on the screen.

## You already know this

You finished the Java stages, so nothing on this page is new Java. It is the first brick of ParcelPilot. If a word feels shaky, go back to its home:

| You need | Where it is taught |
|---|---|
| `javac`, `java`, the `main` method | [Getting started](../../../java/topics/getting-started/index.html) |
| `String`, `int`, `boolean` | [Types and variables](../../../java/topics/types-and-variables/index.html) |
| Class, object, field, constructor, `this` | [Classes and objects](../../../java/topics/classes-and-objects/index.html) |
| Methods and `return` | [Methods](../../../java/topics/methods/index.html) |
| Reading an error message | [Debugging](../../../java/topics/debugging/index.html) |

A plain word you do not know? Look in the [glossary](../../../../sheets/start/glossary.md).

## The idea

A parcel has three facts: an **id**, a **recipient** and a **status**. Loose variables like `parcel1Id`, `parcel1Recipient` get mixed up fast. A `Parcel` class keeps the three facts together. Its fields are `private`, so only the parcel itself can change them.

## Build it in ParcelPilot

1. Make the project folder:

   ```bash
   mkdir -p applications/parcelpilot
   cd applications/parcelpilot
   ```

2. Create `Parcel.java`:

   ```java
   public class Parcel {
       private String id;
       private String recipient;
       private String status;

       public Parcel(String id, String recipient) {
           this.id = id;
           this.recipient = recipient;
           this.status = "CREATED";
       }

       public String label() {
           return id + " -> " + recipient + " [" + status + "]";
       }
   }
   ```

3. Create `Main.java`:

   ```java
   public class Main {
       public static void main(String[] args) {
           Parcel parcel = new Parcel("P-1", "Ava");
           System.out.println(parcel.label());
       }
   }
   ```

## Test it

```bash
javac Main.java Parcel.java
java Main
```

You should see:

```text
P-1 -> Ava [CREATED]
```

If `javac` prints an error, read the file name and the line number. Fix that line and run again. Typical causes: a missing `;`, a missing `}`, or `parcel` instead of `Parcel` (Java cares about capital letters).

> [!TRY]
> 1. In `main`, add a second parcel: `new Parcel("P-2", "Ben")` and print its label too.
> 2. Now add `new Parcel("", "")` and print it.
>
> You should see: ` -> [CREATED]`. A parcel with no id and no name. Java allowed it. Remember this: Step 02 makes it impossible.

## Acceptance criteria

- [ ] `applications/parcelpilot` contains `Parcel.java` and `Main.java`.
- [ ] `javac Main.java Parcel.java` compiles with no errors.
- [ ] `java Main` prints the id, the recipient and `CREATED`.
- [ ] You can point at the class, an object, a field, the constructor and a method in your own code.

## Say it like a developer

- "`Parcel` is a **class**. `new Parcel("P-1", "Ava")` creates an **object**."
- "The **constructor** sets every new parcel to `CREATED`."
- "The fields are **private**, so only `Parcel` can change them."

## Check

> [!CHECK]
> 1. Why is a `Parcel` class better than three loose variables per parcel?
>    <details><summary>Answer</summary>The three facts travel together under one name. You cannot mix up the recipient of parcel 1 with the status of parcel 2, and you can make as many parcels as you need.</details>
> 2. In `this.id = id;`, which `id` is the field and which is the parameter?
>    <details><summary>Answer</summary><code>this.id</code> is the field inside this object. The plain <code>id</code> on the right is the value passed into the constructor.</details>
> 3. What is wrong with `new Parcel("", "")`?
>    <details><summary>Answer</summary>It builds a parcel with no id and no recipient: an invalid state. Nothing in the class stops it yet. Step 02 adds the rules.</details>

## Next

[Step 02](../02-oop-and-composition/README.md): give the parcel rules, so it can only move CREATED → PICKED_UP → DELIVERED.
