# JavaScript-Übungen mit Bun: drills/javascript/<thema>/
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

.PHONY: test help new-task $(TOPICS)

help:
	@echo "make test              — alle Themen"
	@echo "make variables         — nur variables/ (ebenso: math, strings, …)"
	@echo "make variables-task-03 — eine Aufgabe (01–10) im Thema"
	@echo "make new-task STUDENT=becky SUBJECT=computer-science TITLE=\"Loops\" [NUMBER=05] [LANGUAGE=Java]"

test:
	bun test drills/javascript/

$(TOPICS):
	bun test drills/javascript/$@/

variables-task-%:
	bun test drills/javascript/variables/tasks.test.js --test-name-pattern variables-task-$*

math-task-%:
	bun test drills/javascript/math/tasks.test.js --test-name-pattern math-task-$*

strings-task-%:
	bun test drills/javascript/strings/tasks.test.js --test-name-pattern strings-task-$*

arrays-task-%:
	bun test drills/javascript/arrays/tasks.test.js --test-name-pattern arrays-task-$*

conditionals-task-%:
	bun test drills/javascript/conditionals/tasks.test.js --test-name-pattern conditionals-task-$*

loops-task-%:
	bun test drills/javascript/loops/tasks.test.js --test-name-pattern loops-task-$*

functions-task-%:
	bun test drills/javascript/functions/tasks.test.js --test-name-pattern functions-task-$*

objects-task-%:
	bun test drills/javascript/objects/tasks.test.js --test-name-pattern objects-task-$*

# Neue Aufgabe für eine:n Schüler:in anlegen (students/<name>/<fach>/<NN-titel>/)
new-task:
	node students/scripts/new-task.mjs --student "$(STUDENT)" --subject "$(SUBJECT)" --title "$(TITLE)" \
		$(if $(NUMBER),--number "$(NUMBER)") $(if $(SLUG),--slug "$(SLUG)") $(if $(LANGUAGE),--language "$(LANGUAGE)")
