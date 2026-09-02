import { defineConfig, devices } from "@playwright/test";

/**
 * Self-contained Playwright config for the native "re-run only failed tests"
 * example. Deliberately has NO Currents dependency so it mirrors the article:
 * https://currents.dev/posts/playwright-re-run-only-failed-tests
 *
 * The example relies on Playwright's built-in --last-failed / --last-failed-file
 * flags (introduced in v1.61), so no reporter or fixtures are required.
 */
export default defineConfig({
  testDir: ".",

  fullyParallel: true,

  // Disable Playwright's own retries so a failing test genuinely fails the CI
  // job. The "re-run only failed" behaviour we want to demonstrate happens
  // across separate CI runs (workflow re-runs), not via in-run retries.
  retries: 0,

  forbidOnly: !!process.env.CI,

  reporter: process.env.CI ? [["github"], ["list"]] : "list",

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
