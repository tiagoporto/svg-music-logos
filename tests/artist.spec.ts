import { test } from 'happo-playwright'

import { readFileSync } from 'fs'
import { expect } from '@playwright/test'

const data = JSON.parse(readFileSync('./src/server/db/data.json').toString())

test('artist page', async ({ page, happoScreenshot }) => {
  test.slow()

  for (const artist of data) {
    await page.goto(`/artist/${artist.id}`)
    const body = page.locator('body')
    const card = page.locator('[data-test="card"]').last()

    await expect(card).toBeVisible()
    await happoScreenshot(body, {
      component: 'Artist',
      variant: artist.name,
    })
  }
})
