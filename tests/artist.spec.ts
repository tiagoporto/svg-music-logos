import { readFileSync } from 'fs'
import { expect, test } from '@playwright/test'

const data = JSON.parse(readFileSync('./src/server/db/data.json').toString())

test('artist page', async ({ page }) => {
  test.slow()

  for (const artist of data) {
    await page.goto(`/artist/${artist.id}`)
    const card = page.locator('[data-test="card"]').last()

    await expect(card).toBeVisible()
  }
})
