import { test as baseTest } from '@playwright/test'
import { HomePage } from '../pages/homePage'
import { AuthPage } from '../pages/authPage'
import { DashboardPage } from '../pages/dashboardPage'

const test = baseTest.extend<{
  homePage: HomePage
  authPage: AuthPage
  dashboardPage: DashboardPage
}>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page))
  },
  authPage: async ({ page }, use) => {
    await use(new AuthPage(page))
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page))
  },
})

export default test
