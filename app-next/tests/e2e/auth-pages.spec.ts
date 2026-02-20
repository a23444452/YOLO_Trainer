import { test, expect } from '@playwright/test'

test.describe('Auth Pages', () => {
  test('login page should render with form', async ({ page }) => {
    await page.goto('/login')
    await expect(page).toHaveTitle(/登入/)
    await expect(page.getByLabel('Email')).toBeVisible()
    await expect(page.getByLabel('密碼')).toBeVisible()
    await expect(page.getByRole('button', { name: '登入' })).toBeVisible()
  })

  test('login page should have forgot password link', async ({ page }) => {
    await page.goto('/login')
    const forgotLink = page.getByText('忘記密碼？')
    await expect(forgotLink).toBeVisible()
  })

  test('register page should render with form', async ({ page }) => {
    await page.goto('/register')
    await expect(page).toHaveTitle(/註冊/)
    await expect(page.getByLabel('名稱')).toBeVisible()
    await expect(page.getByLabel('Email')).toBeVisible()
  })

  test('forgot password page should render', async ({ page }) => {
    await page.goto('/forgot-password')
    await expect(page).toHaveTitle(/忘記密碼/)
    await expect(page.getByLabel('Email')).toBeVisible()
  })

  test('login page should navigate to register', async ({ page }) => {
    await page.goto('/login')
    await page.getByText('立即註冊').click()
    await expect(page).toHaveURL(/register/)
  })

  test('login page should show validation error for empty submit', async ({ page }) => {
    await page.goto('/login')
    await page.getByRole('button', { name: '登入' }).click()
    // HTML5 validation should prevent empty submit - check that we're still on login
    await expect(page).toHaveURL(/login/)
  })
})
