import { expect, Locator, Page } from '@playwright/test'
import { HelperBase } from './helperBase'
import { getRandomElement } from '../lib/utils'

export class OrdersPage extends HelperBase {
  readonly dashboardPageLink: Locator
  readonly productsPageLink: Locator
  readonly categoriesPageLink: Locator
  readonly targetOrderRow: Locator
  readonly targetOrderRowStatus: Locator
  readonly optionalStatus: string[]
  readonly targetOrderRowActions: Locator
  readonly productsTitle = this.page.getByText('Order Products')

  constructor(page: Page) {
    super(page)
    this.dashboardPageLink = this.page.getByRole('link', {
      name: 'Dashboard',
    })
    this.productsPageLink = this.page.getByRole('link', { name: 'Products' })
    this.categoriesPageLink = this.page.getByRole('link', {
      name: 'Categories',
    })
    this.targetOrderRow = this.page.getByRole('row', {
      name: 'order-Gf6t-1733846319980',
    })
    this.targetOrderRowStatus = this.targetOrderRow.getByRole('combobox')
    this.optionalStatus = ['Pending', 'Shipped', 'InTransit', 'Completed']
    this.targetOrderRowActions = this.targetOrderRow.getByRole('button', {
      name: 'View Products',
    })
    this.productsTitle = this.page.getByText('Order Products')
  }

  async navigate() {
    await this.page.goto('/admin/orders')
  }

  async navigateToDashboard() {
    await this.dashboardPageLink.click()
    await this.page.waitForURL('http://localhost:3000/admin/dashboard')
    await expect(this.page.getByText('Dashboard Overview')).toBeVisible()
  }

  async navigateToProducts() {
    await this.productsPageLink.click()
    await this.page.waitForURL('http://localhost:3000/admin/products')
    await expect(this.page.getByText('Products Management')).toBeVisible()
  }

  async navigateToCategories() {
    await this.categoriesPageLink.click()
    await this.page.waitForURL('http://localhost:3000/admin/categories')
    await expect(
      this.page.getByRole('button', { name: 'Add Category' })
    ).toBeVisible()
  }

  async changeOrderStatus() {
    await this.targetOrderRowStatus.click()
    const status = getRandomElement(this.optionalStatus) as string
    await this.page.getByLabel(status).click()
    await expect(this.targetOrderRowStatus).toHaveText(status, {
      timeout: 8000,
    })
  }

  async viewOrderProducts() {
    await this.targetOrderRowActions.click()
    await expect(this.productsTitle).toBeVisible()
  }
}
