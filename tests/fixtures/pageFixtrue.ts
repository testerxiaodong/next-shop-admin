import { test as baseTest } from '@playwright/test'
import { HomePage } from '../pages/homePage'
import { AuthPage } from '../pages/authPage'
import { DashboardPage } from '../pages/dashboardPage'
import { OrdersPage } from '../pages/ordersPage'
import { ProductsPage } from '../pages/productsPage'
import { CategoriesPage } from '../pages/categoriesPage'
import { AdminLayout } from '../pages/adminLayout'

export const test = baseTest.extend<{
  homePage: HomePage
  authPage: AuthPage
  dashboardPage: DashboardPage
  ordersPage: OrdersPage
  productsPage: ProductsPage
  categoriesPage: CategoriesPage
  adminLayout: AdminLayout
}>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page))
  },
  authPage: async ({ page }, use) => {
    await use(new AuthPage(page))
  },
  adminLayout: async ({ page }, use) => {
    await use(new AdminLayout(page))
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
  categoriesPage: async ({ page }, use) => {
    await use(new CategoriesPage(page))
  },
})
