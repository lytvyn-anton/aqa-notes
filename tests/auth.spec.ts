import { test, expect } from '@playwright/test'
import { qase } from 'playwright-qase-reporter/playwright'
import { LoginPage } from './pages/LoginPage'
import { TEST_USER } from './helpers/env'

test(qase(1, 'login with valid credentials navigates to home'), async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.goto()
  await loginPage.login(TEST_USER.email, TEST_USER.password)
  await expect(page).toHaveURL('/')
})