# File Organizer CLI Option

Practice **path**, **fs**, and safe file operations — no API.

## Command

```bash
organize ~/Downloads
organize . --dry-run    # Show what would happen without moving
organize --help
```

## Behavior

1. Read all files in target directory (not subfolders initially)
2. Map extension → category folder (Images, Documents, Videos, Archives, Other)
3. Create category folders if missing
4. Move each file into its folder
5. Print summary counts

## Dependencies

```bash
npm install commander chalk
```

Built-in modules only for logic: `fs`, `path`.

## Extension map

See [code reference](../code-reference.md) — customize categories in `src/categories.js`.

## Safety rules

- **Never** organize system directories (`/`, `C:\Windows`)
- Require explicit path argument
- Support `--dry-run` so users preview moves
- Skip directories in first version (files only)
- Handle name collisions: `file.pdf` → `file-1.pdf` or skip with warning

## Sample output

```
📁 Organizing: /Users/you/Downloads
   Images: 12 → Images/
   Documents: 8 → Documents/
   Other: 3 → Other/
✅ Done. 23 files organized.
```

## Edge cases

- Empty directory
- Permission denied
- File already in correct folder
- Hidden files (optional: skip dotfiles)

## Milestones

1. List files in directory
2. Classify by extension
3. Move files (with dry-run first!)
4. Summary output with chalk
5. `npm link` → `organize` command

## Warning

Test on a **copy** of Downloads first. Moving files is destructive if paths are wrong.

## See also

[Code reference](../code-reference.md) · [path module](https://nodejs.org/api/path.html)
