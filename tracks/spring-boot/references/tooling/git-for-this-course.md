# Git for this course: tags and `.gitignore`

> [!PICTURE]
> A tag is a sticky note on one photo in your photo album. However many photos you add later, the note stays on that one photo.

You already know the daily Git loop (`status`, `add`, `commit`). It is on the [Git sheet](../../../../sheets/git/README.md). The idea behind Git is in the CS lesson [Git and collaboration](../../../computer-science/index.html#git-collaboration). This page adds only the two things ParcelPilot needs.

## 1. A `.gitignore` for Java and Maven

Put this file in `applications/parcelpilot/` before your first commit:

```gitignore
# Maven build output: rebuilt by every build
target/

# Editor files: personal, not part of the project
.idea/
*.iml
.vscode/

# OS noise
.DS_Store
```

Never commit real passwords or tokens either. Git keeps every old commit forever. Keep secrets in environment variables, see [Configuration](configuration.md).

## 2. A tag before you split the app

In [Step 13](../../topics/13-split-services/README.md) you split ParcelPilot into two services. Save the finished monolith first:

```bash
git tag v-step-12-monolith       # pin a name to the current commit
git tag                          # list all tags
git show v-step-12-monolith      # look at that commit later
```

A tag never moves. The full walk-through is [Git tag checkpoint](../../topics/13-split-services/git-tag-checkpoint.md).

> [!TRY]
> 1. In your project, run `git status`. You should not see `target/` in the list.
> 2. Run `git tag try-me` and then `git tag`.
>
> You should see: `try-me` in the list. Remove it again with `git tag -d try-me`.

> [!CHECK]
> 1. Why is `target/` in `.gitignore`?
>    <details><summary>Answer</summary>Maven rebuilds it every time. It is big and only noise in the history.</details>
> 2. What happens to a tag when you make more commits?
>    <details><summary>Answer</summary>Nothing. It stays on the commit where you put it.</details>
