import { expect, Page } from '@playwright/test'
import { HelperBase } from './helperBase'

export class DashboardPage extends HelperBase {
  readonly ordersChartTitle = this.page.getByText('Orders Over Time')
  readonly productDistributionTitle = this.page.getByText(
    'Product Distribution'
  )
  readonly productsPerCategoryChartTitle = this.page.getByText(
    'Products Per Category'
  )
  readonly latestUsersChartTitle = this.page.getByText('Latest Users')
  readonly ordersPageLink = this.page.getByRole('link', {
    name: 'Orders',
  })
  readonly productsPageLink = this.page.getByRole('link', {
    name: 'Products',
  })
  readonly categoriesPageLink = this.page.getByRole('link', {
    name: 'Categories',
  })

  constructor(page: Page) {
    super(page)
  }

  async navigate() {
    await this.page.goto('/admin/dashboard')
  }

  async ordersChartCheck() {
    await expect(this.ordersChartTitle).toBeVisible()
  }

  async productDistributionCheck() {
    await expect(this.productDistributionTitle).toBeVisible()
  }

  async productsPerCategoryChartCheck() {
    await expect(this.productsPerCategoryChartTitle).toBeVisible()
  }

  async latestUsersChartCheck() {
    await expect(this.latestUsersChartTitle).toBeVisible()
  }

  async navigateToOrdersPage() {
    await this.ordersPageLink.click()
    await this.page.waitForURL('http://localhost:3000/admin/orders')
    await expect(
      this.page.getByText('Orders Management Dashboard')
    ).toBeVisible()
  }

  async navigateToProductsPage() {
    await this.productsPageLink.click()
    await this.page.waitForURL('http://localhost:3000/admin/products')
    await expect(this.page.getByText('Products Management')).toBeVisible()
  }

  async navigateToCategoriesPage() {
    await this.categoriesPageLink.click()
    await this.page.waitForURL('http://localhost:3000/admin/categories')
    await expect(
      this.page.getByRole('button', { name: 'Add Category' })
    ).toBeVisible()
  }
}
