import { Page, expect } from '@playwright/test'
import { HelperBase } from './helperBase'

export class ProductsPage extends HelperBase {
  readonly dashboardPageLink = this.page.getByRole('link', {
    name: 'Dashboard',
  })
  readonly ordersPageLink = this.page.getByRole('link', {
    name: 'Orders',
  })
  readonly categoriesPageLink = this.page.getByRole('link', {
    name: 'Categories',
  })
  // 添加产品按钮
  readonly addProductButton = this.page.getByRole('button', {
    name: 'Add Product',
  })
  // 产品名称输入框
  readonly productTitleInput = this.page.getByLabel('Title')
  // 产品分类下拉框
  readonly productCategorySelect = this.page.getByLabel('Category')
  // 产品价格输入框
  readonly productPriceInput = this.page.getByLabel('Price')
  // 产品最大库存量输入框
  readonly productMaxQuantityInput = this.page.getByLabel('Max Quantity')
  // 产品主图上传
  readonly heroImageInput = this.page.getByLabel('Hero Image')
  // 产品详情图上传
  readonly productsImageInput = this.page.getByLabel('Products Images')
  // 提交按钮
  readonly submitButton = this.page.getByRole('button', {
    name: 'Submit',
  })
  constructor(page: Page) {
    super(page)
  }

  async navigate() {
    await this.page.goto('/admin/products')
  }

  async navigateToDashboard() {
    await this.dashboardPageLink.click()
    await this.page.waitForURL('http://localhost:3000/admin/dashboard')
    await expect(this.page.getByText('Dashboard Overview')).toBeVisible()
  }

  async navigateToOrdersPage() {
    await this.ordersPageLink.click()
    await this.page.waitForURL('http://localhost:3000/admin/orders')
    await expect(
      this.page.getByText('Orders Management Dashboard')
    ).toBeVisible()
  }

  async navigateToCategoriesPage() {
    await this.categoriesPageLink.click()
    await this.page.waitForURL('http://localhost:3000/admin/categories')
    await expect(
      this.page.getByRole('button', { name: 'Add Category' })
    ).toBeVisible()
  }

  async addProduct() {
    await this.addProductButton.click()
  }
}
