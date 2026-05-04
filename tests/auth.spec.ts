import { test, expect } from '@playwright/test'
import { qase } from 'playwright-qase-reporter/playwright'
import { LoginPage } from '@pages/LoginPage'
import { HomePage } from '@pages/HomePage'
import { TEST_USER } from '@helpers/env'
import { ROUTES } from '@helpers/routes'

test('login with valid credentials', async ({ page }) => {
  qase.id(1)
  const loginPage = new LoginPage(page)
  const homePage = new HomePage(page)
  await loginPage.goto()
  await loginPage.login(TEST_USER.email, TEST_USER.password)
  await expect(page).toHaveURL(ROUTES.home)
  await expect(homePage.heading).toBeVisible()
})
