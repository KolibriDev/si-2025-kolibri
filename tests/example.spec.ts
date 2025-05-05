import { test, expect } from "@playwright/test";

test("get started link", async ({ page }) => {
  await page.goto("https://si-2025-kolibri.vercel.app/");

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { level: 1, name: "TestC" })
  ).toBeVisible();
});
