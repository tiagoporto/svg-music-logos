import { expect } from '@playwright/test'
import { test } from 'happo-playwright'

test('start page', async ({ page, happoScreenshot }) => {
  await page.goto('/?itemsPerPage=30')
  const body = page.locator('body')

  const pagination = page.getByTestId('pagination')
  const lastPaginationButton = pagination.locator('ul li:nth-last-child(2)').locator('button')
  const totalPages = Number(await lastPaginationButton.textContent())
  const nextButton = pagination.locator('ul li').last().locator('button')

  // first page
  await expect(page.locator('[data-testid="card"]').last()).toBeVisible()
  await happoScreenshot(body, {
    component: 'Homepage',
    variant: `Page 1`,
  })

  for (let currentPage = 2; currentPage <= totalPages; currentPage++) {
    await nextButton.click()

    // eslint-disable-next-line playwright/no-wait-for-timeout -- waiting until happo take screenshot
    await page.waitForTimeout(1000)
    await expect(page.locator('[data-testid="skeleton"]').last()).toBeHidden()
    await expect(page.locator('[data-testid="card"]').last().locator('img')).toBeVisible()

    await happoScreenshot(body, {
      component: 'Homepage',
      variant: `Page ${currentPage}`,
    })
  }
})
