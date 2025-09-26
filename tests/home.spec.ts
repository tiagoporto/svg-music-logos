import { expect } from '@playwright/test'
import { test } from 'happo-playwright'

test('start page', async ({ page, happoScreenshot }) => {
  await page.goto('/?itemsPerPage=30')
  const body = page.locator('body')
  const nextButton = page.getByRole('button', { name: 'Next page' })
  let currentPage = 1

  do {
    await expect(page.locator('[data-test="card"]').last()).toBeVisible()
    await happoScreenshot(body, {
      component: 'Homepage',
      variant: `Page ${currentPage}`,
    })

    // eslint-disable-next-line playwright/no-conditional-in-test
    if (await nextButton.isEnabled()) {
      currentPage++
      await nextButton.click()
    }
  } while (await nextButton.isEnabled())
})
