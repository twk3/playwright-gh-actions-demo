import { expect } from "@playwright/test";
import { test } from "./testLib";

test("basic test @basic", async ({ page, currentsRules }) => {
  await page.goto("https://todomvc.com/examples/backbone/dist/");

  // Use locators to represent a selector and re-use them
  const inputBox = page.locator("input.new-todo");
  const todoList = page.locator(".todo-list");

  console.log("Currents rules: ", currentsRules);

  await inputBox.fill("Stop using Cypress");
  await inputBox.press("Enter");
  await expect(todoList).toHaveText("Learn Playwright");
});
