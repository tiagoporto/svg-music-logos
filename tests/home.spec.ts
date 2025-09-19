import { test } from 'happo-playwright'
import { expect } from '@playwright/test'

test('start page', async ({ page, happoScreenshot }) => {
  await page.goto('/')
  const body = page.locator('body')
  const nextButton = await page.getByRole('button', { name: 'Next page' })
  await expect(page.locator('[data-test="card"]').last()).toBeVisible()

  await happoScreenshot(body, {
    component: 'Homepage',
    variant: 'Page 1',
  })

  await nextButton.click()
  await expect(page.locator('[data-test="card"]').last()).toBeVisible()

  await happoScreenshot(body, {
    component: 'Homepage',
    variant: 'Page 2',
  })
})
