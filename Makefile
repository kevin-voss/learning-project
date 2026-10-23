# JavaScript drills with Bun: drills/javascript/<topic>/
#
# Test every topic:
#   make test
#
# One whole topic:
#   make variables
#   make math | strings | arrays | conditionals | loops | functions | objects
#
# One single task (number 01–11):
#   make variables-task-03
#   make arrays-task-01
#
# Note: "make test variables" runs "test" and then "variables".
# For one topic only: make variables

TOPICS := variables math strings arrays conditionals loops functions objects

.PHONY: test help new-exercise test-task site catalog check-path $(TOPICS)

help:
	@echo "make test              — every drill topic"
	@echo "make variables         — only variables/ (same for math, strings, …)"
	@echo "make variables-task-03 — one task (01–11) of a topic"
	@echo "make new-exercise STUDENT=becky SUBJECT=computer-science NUMBER=05 TITLE=\"Loops\" TASKS=\"Times table, Guess the number\" [LANGUAGE=Java]"
	@echo "make test-task TASK=04_2 [PART=a] [STUDENT=becky] [SUBJECT=java] [SOLUTION=1] — run a student task's tests.json"
	@echo "make catalog           — rewrite the generated parts of hub/index.html"
	@echo "make check-path        — check hub/path.mjs (ids, retired ids, links)"
	@echo "make site              — check the path, build dist/site, check every link"

test:
	bun test ./drills/javascript/

$(TOPICS):
	bun test ./drills/javascript/$@/

variables-task-%:
	bun test ./drills/javascript/variables/tasks.test.js --test-name-pattern variables-task-$*

math-task-%:
	bun test ./drills/javascript/math/tasks.test.js --test-name-pattern math-task-$*

strings-task-%:
	bun test ./drills/javascript/strings/tasks.test.js --test-name-pattern strings-task-$*

arrays-task-%:
	bun test ./drills/javascript/arrays/tasks.test.js --test-name-pattern arrays-task-$*

conditionals-task-%:
	bun test ./drills/javascript/conditionals/tasks.test.js --test-name-pattern conditionals-task-$*

loops-task-%:
	bun test ./drills/javascript/loops/tasks.test.js --test-name-pattern loops-task-$*

functions-task-%:
	bun test ./drills/javascript/functions/tasks.test.js --test-name-pattern functions-task-$*

objects-task-%:
	bun test ./drills/javascript/objects/tasks.test.js --test-name-pattern objects-task-$*

# New exercise sheet with its tasks for a student
# (students/<name>/<subject>/exercises/exercise-<NN>-<title>/task-<NN>-<k>-<title>/)
# The same NUMBER again adds tasks to the existing exercise.
new-exercise:
	node students/scripts/new-exercise.mjs --student "$(STUDENT)" --subject "$(SUBJECT)" --number "$(NUMBER)" \
		--title "$(TITLE)" --tasks "$(TASKS)" $(if $(SLUG),--slug "$(SLUG)") $(if $(LANGUAGE),--language "$(LANGUAGE)")

# Tests of one student task (its tests.json) on my-solution/, or on solution/ with SOLUTION=1
test-task:
	@node students/scripts/test-task.mjs "$(TASK)" $(if $(PART),--part "$(PART)") $(if $(STUDENT),--student "$(STUDENT)") $(if $(SUBJECT),--subject "$(SUBJECT)") \
		$(if $(MAIN),--main "$(MAIN)") $(if $(SOLUTION),--solution)

# Website: check the path, refresh the landing page, build dist/site, check links (same as Vercel)
catalog:
	node hub/scripts/catalog.mjs

check-path:
	node hub/scripts/check-path.mjs

site:
	node hub/scripts/check-path.mjs
	node hub/scripts/build-site.mjs
	node hub/scripts/check-links.mjs
