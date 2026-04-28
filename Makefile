# JavaScript-Übungen mit Bun: beginner-js/<thema>/
#
# Alle Themen testen:
#   make test
#
# Ein ganzes Thema:
#   make variables
#   make math | strings | arrays | conditionals | loops | functions | objects
#
# Eine einzelne Aufgabe (Nummer 01–10):
#   make variables-task-03
#   make arrays-task-01
#
# Hinweis: „make test variables“ führt nacheinander „test“ und „variables“ aus.
# Nur ein Thema: make variables

TOPICS := variables math strings arrays conditionals loops functions objects

.PHONY: test help $(TOPICS)

help:
	@echo "make test              — alle Themen"
	@echo "make variables         — nur variables/ (ebenso: math, strings, …)"
	@echo "make variables-task-03 — eine Aufgabe (01–10) im Thema"

test:
	bun test beginner-js/

$(TOPICS):
	bun test beginner-js/$@/

variables-task-%:
	bun test beginner-js/variables/tasks.test.js --test-name-pattern variables-task-$*

math-task-%:
	bun test beginner-js/math/tasks.test.js --test-name-pattern math-task-$*

strings-task-%:
	bun test beginner-js/strings/tasks.test.js --test-name-pattern strings-task-$*

arrays-task-%:
	bun test beginner-js/arrays/tasks.test.js --test-name-pattern arrays-task-$*

conditionals-task-%:
	bun test beginner-js/conditionals/tasks.test.js --test-name-pattern conditionals-task-$*

loops-task-%:
	bun test beginner-js/loops/tasks.test.js --test-name-pattern loops-task-$*

functions-task-%:
	bun test beginner-js/functions/tasks.test.js --test-name-pattern functions-task-$*

objects-task-%:
	bun test beginner-js/objects/tasks.test.js --test-name-pattern objects-task-$*
