import { test } from 'happo-playwright'

test('start page', async ({ page, happoScreenshot }) => {
  await page.goto('http://localhost:3000/svg-music-logos/')
  const body = page.locator('body')
  const nextButton = await page.getByRole('button', { name: 'Next page' })
  let currentPage = 1

  await happoScreenshot(body, {
    component: 'Start page',
    variant: 'Page 1',
  })

  do {
    currentPage++
    await nextButton.click()

    await happoScreenshot(body, {
      component: 'Start page',
      variant: `Page ${currentPage}`,
    })
  } while (!(await nextButton.isDisabled()))
})
