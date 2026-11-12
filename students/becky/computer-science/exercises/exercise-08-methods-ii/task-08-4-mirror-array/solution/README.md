# Sample solution · Task 08_4 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

```bash
javac MirrorArray.java
java MirrorArray
```

## How it works, step by step

1. **`mirrorCopy`** — new array; index `i` takes `source[length - 1 - i]`.
2. **`mirrorInPlace`** — swap from both ends until the middle.
3. **`main`** keeps a untouched `original`, mirrors a **copy** of the data, then mirrors a second array in place.

**Test run**

```text
original: [1, 13, 3, 42, 5]
after copy source: [1, 13, 3, 42, 5]
mirrored copy: [5, 42, 3, 13, 1]
in place: [5, 42, 3, 13, 1]
```

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| Reverse the same reference in copy | Original changes too | Write into a **new** array |
| Only one loop from 0 to length | Swap same pair twice | Stop at `length / 2` for in-place |
| Return void from copy | Callers cannot use result | **Return** the new array |
