
---

# 🤖 `AGENT_WORKFLOW.md`

```md
# AI Agent Workflow Log

## Agents Used
- ChatGPT (architecture, logic validation, debugging)
- GitHub Copilot (boilerplate & inline suggestions)

---

## Prompts & Outputs

### Example 1 — Compliance Formula
**Prompt:**
> Implement FuelEU compliance balance formula using clean architecture.

**Output:**
Generated use-case for CB calculation.

**Validation:**
- Cross-checked with FuelEU Annex IV
- Corrected energy calculation multiplier
- Added persistence layer

---

### Example 2 — Pooling Algorithm
**Prompt:**
> Implement FuelEU pooling redistribution rules.

**Output:**
Greedy surplus-to-deficit algorithm.

**Validation:**
- Verified no ship exits worse
- Added total CB ≥ 0 check
- Enforced surplus non-negativity

---

## Validation & Corrections
- Manually validated all formulas
- Ensured AI did not introduce framework dependencies in core
- Refactored AI-generated code to match hexagonal architecture

---

## Observations
### Where AI Helped
- Faster scaffolding
- Logic brainstorming
- Error debugging

### Where AI Failed
- Occasionally skipped regulatory edge cases
- Generated incorrect imports (manual fixes applied)

---

## Best Practices Followed
- Core logic never generated blindly
- AI outputs always reviewed
- Prompts kept specific and constrained
