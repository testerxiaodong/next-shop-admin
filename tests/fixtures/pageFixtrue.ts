import { test as baseTest } from '@playwright/test'
import { HomePage } from '../pages/homePage'
import { AuthPage } from '../pages/authPage'
import { DashboardPage } from '../pages/dashboardPage'
import { OrdersPage } from '../pages/ordersPage'
import { ProductsPage } from '../pages/productsPage'

const test = baseTest.extend<{
  homePage: HomePage
  authPage: AuthPage
  dashboardPage: DashboardPage
  ordersPage: OrdersPage
  productsPage: ProductsPage
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
  ordersPage: async ({ page }, use) => {
    await use(new OrdersPage(page))
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page))
  },
})

export default test
