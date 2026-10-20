import { describe, expect, it } from "vitest";
import { adaptationHints, applyEvent, createEmptyProfile } from "./learnerMemory";

describe("learnerMemory", () => {
  it("aggregates playground failures into struggles", () => {
    let p = createEmptyProfile();
    for (let i = 0; i < 3; i++) {
      p = applyEvent(p, {
        type: "playground.attempt",
        surface: "codestep",
        topicId: "loops",
        payload: { passed: false, taskId: "loops-1" },
      });
    }
    const struggle = p.struggles.find((s) => s.kind === "playground_fail");
    expect(struggle?.count).toBe(3);
    expect(adaptationHints(p).explanationDepth).toBe("deep");
  });

  it("stores questions and lists them as open", () => {
    let p = createEmptyProfile();
    p = applyEvent(p, {
      type: "question.asked",
      surface: "codestep",
      topicId: "arrays",
      payload: { text: "When do I use map vs forEach?" },
    });
    expect(p.questions).toHaveLength(1);
    expect(adaptationHints(p).openQuestions[0]).toContain("map");
  });
});
