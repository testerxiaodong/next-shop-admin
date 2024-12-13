import { expect, Locator, Page } from '@playwright/test'
import { HelperBase } from './helperBase'

export class DashboardPage extends HelperBase {
  readonly ordersChartTitle: Locator
  readonly productDistributionChartTitle: Locator
  readonly productsPerCategoryChartTitle: Locator
  readonly latestUsersChartTitle: Locator
  readonly ordersPageLink: Locator
  readonly productsPageLink: Locator
  readonly categoriesPageLink: Locator

  constructor(page: Page) {
    super(page)
    this.ordersChartTitle = this.page.getByText('Orders Over Time')
    this.productDistributionChartTitle = this.page.getByText(
      'Product Distribution'
    )
    this.productsPerCategoryChartTitle = this.page.getByText(
      'Products Per Category'
    )
    this.latestUsersChartTitle = this.page.getByText('Latest Users')
    this.ordersPageLink = this.page.getByRole('link', {
      name: 'Orders',
    })
    this.productsPageLink = this.page.getByRole('link', {
      name: 'Products',
    })
    this.categoriesPageLink = this.page.getByRole('link', {
      name: 'Categories',
    })
  }

  async navigate() {
    await this.page.goto('/admin/dashboard')
  }

  async ordersChartCheck() {
    await expect(this.ordersChartTitle).toBeVisible()
  }

  async productDistributionChartCheck() {
    await expect(this.productDistributionChartTitle).toBeVisible()
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
