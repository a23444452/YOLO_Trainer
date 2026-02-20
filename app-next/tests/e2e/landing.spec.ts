import { test, expect } from '@playwright/test'

test.describe('Landing Page', () => {
  test('should load homepage with correct title', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/YOLO Trainer/)
  })

  test('should display navigation with logo', async ({ page }) => {
    await page.goto('/')
    const logo = page.locator('nav img[alt="YOLO Trainer"]')
    await expect(logo).toBeVisible()
  })

  test('should display hero section', async ({ page }) => {
    await page.goto('/')
    const heroText = page.getByText('YOLO Trainer')
    await expect(heroText.first()).toBeVisible()
  })

  test('should have working navigation links', async ({ page }) => {
    await page.goto('/')
    // Navigation should have key section links
    const featuresLink = page.locator('nav').getByText('功能')
    await expect(featuresLink).toBeVisible()
  })

  test('should display footer with newsletter form', async ({ page }) => {
    await page.goto('/')
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(500)

    const newsletterInput = page.locator('footer input[type="email"]')
    await expect(newsletterInput).toBeVisible()
  })

  test('should have login/register button when not authenticated', async ({ page }) => {
    await page.goto('/')
    const authButton = page.locator('nav').getByText('註冊 / 登入')
    await expect(authButton).toBeVisible()
  })
})
