import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'
import { test } from 'happo-playwright'

async function waitForAllImagesLoaded(page: Page, timeout = 10_000) {
  await page.waitForFunction(
    () => [...document.images].every(img => img.complete && img.naturalWidth > 0),
    undefined,
    { timeout },
  )
}

test('start page', async ({ page, happoScreenshot }) => {
  await page.goto('/?itemsPerPage=30')
  const body = page.locator('body')

  const pagination = page.getByTestId('pagination')
  const lastPaginationButton = pagination.locator('ul li:nth-last-child(2)').locator('button')
  const totalPages = Number(await lastPaginationButton.textContent())
  const nextButton = pagination.locator('ul li').last().locator('button')

  // first page
  await expect(page.locator('[data-testid="card"]').last()).toBeVisible()
  waitForAllImagesLoaded(page)
  await happoScreenshot(body, {
    component: 'Homepage',
    variant: `Page 1`,
  })

  // run a for loop based in totalPages
  for (let currentPage = 2; currentPage <= totalPages; currentPage++) {
    await nextButton.click({ delay: 600 })
    await expect(page.locator('[data-testid="skeleton"]').last()).toBeHidden()
    await expect(page.locator('[data-testid="card"]').last()).toBeVisible()
    waitForAllImagesLoaded(page)

    await happoScreenshot(body, {
      component: 'Homepage',
      variant: `Page ${currentPage}`,
    })
  }
})
