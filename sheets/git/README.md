# Git: your daily loop

> [!PICTURE]
> Git is a **photo album** for your project. A **commit** is one photo of all your files at one moment. You can always look back at an old photo.
>
> A **branch** is a second album. You glue new photos into your own album, and the main album stays clean. **GitHub** is a shelf on the internet where the albums are kept safe.

<div data-anim="album"></div>

## The idea

You already cloned this repository in [Get set up](../setup/README.md) and made your own branch. So:

- You **never** run `git init` here. The album already exists.
- You **always** work on your own branch, never on `main`.

Every day you do the same loop: look, choose, take the photo, upload.

## The daily loop

```bash
git status                       # 1. look: what changed? which branch am I on?
git diff                         # 2. read the changed lines
git add projects/01-about-me     # 3. choose what goes into the photo
git commit -m "Add my hobbies"   # 4. take the photo, with a short label
git push                         # 5. put it on the GitHub shelf
```

`git add .` chooses everything in the folder you are in. Run `git status` first so you know what "everything" is.

The very first push of a new branch needs one extra word: `git push -u origin your-name`. After that, `git push` is enough.

## More you need often

| You want to … | Command |
|---|---|
| get new lessons from your teacher | `git pull origin main` |
| see which branch you are on | `git branch` (the `*` marks it) |
| move to another branch | `git switch your-name` |
| see the last photos | `git log --oneline` |
| see what you already chose with `add` | `git diff --staged` |

## Undo safely

Always run `git status` first. It tells you which undo you need.

| Oops | Safe fix |
|---|---|
| I changed a file and want the last photo back | `git restore path/to/file` (your changes in that file are gone) |
| I ran `git add` on the wrong file | `git restore --staged path/to/file` (the file keeps your changes) |
| A commit I already pushed was wrong | `git revert <commit-id>`: a new photo that undoes the old one |

> [!WARN]
> Never commit passwords, API keys, `.env` files or `node_modules/`. A pushed secret stays in the history. Never use `git push --force` or `git reset --hard` unless your teacher is with you.

> [!NOTE]
> When your work is ready, open a **pull request** on GitHub: "please look at my branch". Your teacher reads it and can merge it. If Git says **conflict**, two people changed the same lines. Run `git status`, open the file, keep the right lines, delete the `<<<<<<<`, `=======` and `>>>>>>>` markers, then `git add` and `git commit`.

> [!TRY]
> 1. Open the terminal in your copy of this repo: `cd ~/code/learning-project`.
> 2. Run `git status`. Check that it says `On branch your-name`, not `main`.
> 3. Open `projects/01-about-me/README.md` in your editor, add one empty line at the end and save.
> 4. Run `git status` and then `git diff`.
> 5. Run `git restore projects/01-about-me/README.md` and `git status` again.
>
> You should see: the file listed as `modified`, a `+` line in the diff, and at the end `nothing to commit, working tree clean`.

> [!CHECK]
> 1. In the album picture, what is a commit and what is a branch?
>    <details><summary>Answer</summary>A commit is one photo of all files. A branch is a second album where you add your own photos.</details>
> 2. Why do you never run `git init` in this repo?
>    <details><summary>Answer</summary>The repository already exists. You cloned it. <code>git init</code> would start an empty second album inside it.</details>
> 3. You ran `git add secret.txt` by mistake. How do you take it back out?
>    <details><summary>Answer</summary><code>git restore --staged secret.txt</code>. The file stays on disk, it is only no longer chosen.</details>

**Next:** [What Git really does: snapshots and branches](../../tracks/computer-science/index.html#git-collaboration), the lesson that explains what happens inside.
