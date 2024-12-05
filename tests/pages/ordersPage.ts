import { expect, Page } from '@playwright/test'
import { HelperBase } from './helperBase'
import { getRandomElement } from '../lib/utils'

export class OrdersPage extends HelperBase {
  readonly dashboardPageLink = this.page.getByRole('link', {
    name: 'Dashboard',
  })
  readonly productsPageLink = this.page.getByRole('link', { name: 'Products' })
  readonly categoriesPageLink = this.page.getByRole('link', {
    name: 'Categories',
  })
  readonly targetOrderRow = this.page.getByRole('row', {
    name: 'order-9WPT-1733240012494',
  })
  readonly targetOrderRowStatus = this.targetOrderRow.getByRole('combobox')
  readonly optionalStatus: string[] = [
    'Pending',
    'Shipped',
    'InTransit',
    'Completed',
  ]
  readonly targetOrderRowActions = this.targetOrderRow.getByRole('button', {
    name: 'View Products',
  })
  readonly productsTitle = this.page.getByText('Order Products')
  constructor(page: Page) {
    super(page)
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
    await expect(this.targetOrderRowStatus).toHaveText(status)
  }

  async viewOrderProducts() {
    await this.targetOrderRowActions.click()
    await expect(this.productsTitle).toBeVisible()
  }
}
