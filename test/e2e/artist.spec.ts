import { expect, test } from '@playwright/test'
import { readFileSync } from 'node:fs'

const data = JSON.parse(readFileSync('./server/db/data.json').toString())

test('artist page', async ({ page }) => {
  test.slow()

  for (const artist of data) {
    await page.goto(`/artist/${artist.id}`)
    const card = page.locator('[data-testid="card"]').last()

    await expect(card).toBeVisible()
  }
})
