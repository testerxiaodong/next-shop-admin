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
}
