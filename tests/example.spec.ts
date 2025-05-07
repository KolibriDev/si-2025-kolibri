import { test, expect, chromium } from '@playwright/test'

test('get started link', async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()

  await page.goto('https://si-2025-kolibri.vercel.app')

  await page.getByRole('button', { name: 'Opna framtal' }).click()

  await expect(page).toHaveURL(`https://si-2025-kolibri.vercel.app/login`)

  await page.getByLabel('Símanúmer', { exact: true }).fill('7884888')

  await page.getByRole('button', { name: 'Auðkenna' }).click()

  await expect(page).toHaveURL(
    `https://si-2025-kolibri.vercel.app/framtal/nytt/upplysingar`,
  )

  await page.getByRole('button', { name: 'Halda áfram' }).click()

  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'Þú ert að fara að skila skattframtali',
    }),
  ).toBeVisible()

  await page.getByRole('button', { name: 'Halda áfram' }).click()

  await expect(page).toHaveURL(
    `https://si-2025-kolibri.vercel.app/framtal/nytt/gagnaoflun`,
  )

  await page.getByRole('checkbox').check()

  await page.getByRole('button', { name: 'Halda áfram' }).click()

  await expect(page).toHaveURL(
    `https://si-2025-kolibri.vercel.app/framtal/nytt/personuupplysingar`,
  )

  await expect(page.getByLabel('Netfang')).toHaveValue(
    'jokull.thordarson@email.is',
  )

  await page.getByRole('button', { name: 'Halda áfram' }).click()

  await expect(page).toHaveURL(
    `https://si-2025-kolibri.vercel.app/framtal/nytt/bankareikningur`,
  )

  await browser.close()
})
