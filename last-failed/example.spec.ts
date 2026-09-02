import { expect, test } from "@playwright/test";

/**
 * A small suite spread across shards. Most tests always pass; one test
 * simulates a failure caused by an *environmental* issue (not a code bug).
 *
 * The "environmental" test fails on the first CI attempt and passes once the
 * issue is "fixed" on a re-run. In this example the fix is simulated by the
 * GitHub Actions run attempt number: re-running the failed jobs bumps
 * github.run_attempt, which the workflow passes in as RUN_ATTEMPT.
 *
 * Expected CI behaviour:
 *   - Attempt 1: the environmental test fails -> recorded in .last-run.json.
 *   - Re-run failed jobs (attempt 2): the cached .last-run.json is restored,
 *     --last-failed is added, so ONLY the previously-failed test runs, and it
 *     now passes.
 */

test("addition is correct", async () => {
  expect(1 + 1).toBe(2);
});

test("string concatenation is correct", async () => {
  expect("foo" + "bar").toBe("foobar");
});

test("array length is correct", async () => {
  expect([1, 2, 3]).toHaveLength(3);
});

test("object equality is correct", async () => {
  expect({ a: 1 }).toEqual({ a: 1 });
});

test("boolean logic is correct", async () => {
  expect(true && true).toBe(true);
});

test("environmental dependency is available", async () => {
  // Simulates a flaky/environmental failure: fails on the first attempt,
  // passes once the environment is "fixed" on a workflow re-run.
  const attempt = Number(process.env.RUN_ATTEMPT ?? "1");
  expect(
    attempt,
    "environment not ready yet (simulated failure on first attempt)"
  ).toBeGreaterThan(1);
});
