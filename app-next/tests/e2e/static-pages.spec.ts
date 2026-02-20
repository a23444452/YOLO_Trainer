import { test, expect } from '@playwright/test'

test.describe('Static Pages', () => {
  test('terms page should render', async ({ page }) => {
    await page.goto('/terms')
    await expect(page).toHaveTitle(/服務條款/)
    await expect(page.getByRole('heading', { name: '服務條款' })).toBeVisible()
  })

  test('privacy page should render', async ({ page }) => {
    await page.goto('/privacy')
    await expect(page).toHaveTitle(/隱私政策/)
    await expect(page.getByRole('heading', { name: '隱私政策' })).toBeVisible()
  })

  test('about page should render', async ({ page }) => {
    await page.goto('/about')
    await expect(page).toHaveTitle(/關於我們/)
    await expect(page.getByRole('heading', { name: '關於 YOLO Trainer' })).toBeVisible()
  })

  test('faq page should render with accordion', async ({ page }) => {
    await page.goto('/faq')
    await expect(page).toHaveTitle(/常見問題/)
    // Click first FAQ to expand
    const firstQuestion = page.getByText('YOLO Trainer 是什麼？')
    await expect(firstQuestion).toBeVisible()
    await firstQuestion.click()
    await expect(page.getByText('無需程式碼即可在本機訓練')).toBeVisible()
  })

  test('legal layout should have navigation back to home', async ({ page }) => {
    await page.goto('/terms')
    const homeLink = page.locator('header a[href="/"]')
    await expect(homeLink).toBeVisible()
  })
})
