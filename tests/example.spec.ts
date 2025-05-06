import { test, expect } from '@playwright/test'

test('get started link', async ({ page }) => {
  await page.goto(
    'https://si-2025-kolibri.vercel.app/framtal/feikID/upplysingar',
  )

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'Þú ert að fara að skila skattframtali',
    }),
  ).toBeVisible()

  await page.getByRole('button', { name: 'Halda áfram' }).click()

  await expect(page).toHaveURL(
    `https://si-2025-kolibri.vercel.app/framtal/feikID/gagnaoflun`,
  )
})
