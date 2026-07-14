# Spring Boot System Design: Build One Product, One Step at a Time

This course teaches you how a small backend grows into a real system.

You build one product: **ParcelPilot**, a tiny parcel-tracking service. At first it is only a small program that can describe one parcel. Step by step, it learns more: how to remember parcels, how to answer another program, how to survive mistakes, and how to grow when the work becomes bigger.

You do **not** need to understand all the words on day one. The course is written so each step teaches the next word right before you use it.

Start here:

1. Read [PROJECT-STORY.md](PROJECT-STORY.md) for the big picture.
2. Open [GUIDE.md](GUIDE.md) and follow it from the top.
3. Do one numbered topic at a time. Do not read the references first.

The rule for students is simple: **read the step, build the small change, prove it works, then move on.**

## What is in this folder?

```text
spring-boot-system-design/
├── GUIDE.md          # The path to follow, in order
├── PROJECT-STORY.md  # The simple story of what ParcelPilot becomes
├── applications/     # Empty at first; your code will grow here
├── topics/           # The numbered lessons
└── references/       # Extra explanations for when a lesson links to them
```

## How to learn from it

Each numbered topic has the same rhythm:

1. It shows the problem in the current project.
2. It teaches the new idea in plain language.
3. It asks you to build one small change.
4. It gives you a way to check that the change worked.
5. It ends with questions so you can explain the idea in your own words.

If you see a word you do not know yet, do not panic. The lesson that needs the word will define it. The [glossary](references/glossary.md) is there when you want to look something up, not as homework before you start.

## Product scope

Keep ParcelPilot small while learning the core path. Do not add screens, payments, cloud hosting, or extra features unless a topic asks for them. The course adds complexity only when the current version has a clear problem to fix.
