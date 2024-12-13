import { Locator, Page, expect } from '@playwright/test'
import { HelperBase } from './helperBase'
import path from 'path'

export class ProductsPage extends HelperBase {
  // 导航链接
  readonly dashboardPageLink: Locator
  readonly ordersPageLink: Locator
  readonly categoriesPageLink: Locator

  // 表单验证提示信息
  readonly titleRequiredMessage: Locator
  readonly categoryRequiredMessage: Locator
  readonly priceRequiredMessage: Locator
  readonly maxQuantityRequiredMessage: Locator
  readonly heroImageRequiredMessage: Locator
  readonly productsImageRequiredMessage: Locator

  // 添加产品按钮
  readonly addProductButton: Locator
  // 产品名称输入框
  readonly productTitleInput: Locator
  // 产品分类下拉框
  readonly productCategorySelect: Locator
  // 产品价格输入框
  readonly productPriceInput: Locator
  // 产品最大库存量输入框
  readonly productMaxQuantityInput: Locator
  // 产品主图上传
  readonly heroImageInput: Locator
  // 产品详情图上传
  readonly productsImageInput: Locator
  // 提交按钮
  readonly submitButton: Locator
  // 添加成功提示
  readonly createSuccessMessage: Locator
  // 删除按钮
  readonly deleteButton: Locator
  // 删除成功提示
  readonly deleteSuccessMessage: Locator
  // 编辑成功提示
  readonly editSuccessMessage: Locator

  constructor(page: Page) {
    super(page)
    this.dashboardPageLink = this.page.getByRole('link', {
      name: 'Dashboard',
    })
    this.ordersPageLink = this.page.getByRole('link', {
      name: 'Orders',
    })
    this.categoriesPageLink = this.page.getByRole('link', {
      name: 'Categories',
    })
    this.titleRequiredMessage = this.page.getByText('Title is required')
    this.categoryRequiredMessage = this.page.getByText('Category is required')
    this.priceRequiredMessage = this.page.getByText('Price is required')
    this.maxQuantityRequiredMessage = this.page.getByText(
      'Max Quantity is required'
    )
    this.heroImageRequiredMessage = this.page.getByText(
      'Hero Image is required'
    )
    this.productsImageRequiredMessage = this.page.getByText(
      'At least one image is required'
    )
    this.addProductButton = this.page.getByRole('button', {
      name: 'Add Product',
    })
    this.productTitleInput = this.page.getByLabel('Title')
    this.productCategorySelect = this.page.getByRole('combobox')
    this.productPriceInput = this.page.locator('#price')
    this.productMaxQuantityInput = this.page.locator('#maxQuantity')
    this.heroImageInput = this.page.getByLabel('Hero Image')
    this.productsImageInput = this.page.getByLabel('Product Images')
    this.submitButton = this.page.getByRole('button', {
      name: 'Submit',
    })
    this.createSuccessMessage = this.page.getByText(
      'Product created successfully!'
    )
    this.deleteButton = this.page.getByRole('button', {
      name: 'Delete',
    })
    this.deleteSuccessMessage = this.page.getByText(
      'Product deleted successfully'
    )
    this.editSuccessMessage = this.page.getByText(
      'Product updated successfully!'
    )
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

  async formValidationErrorMessages() {
    await this.addProductButton.click()
    await this.submitButton.click()
    await expect(this.titleRequiredMessage).toBeVisible()
    await expect(this.categoryRequiredMessage).toBeVisible()
    await expect(this.priceRequiredMessage).toBeVisible()
    await expect(this.maxQuantityRequiredMessage).toBeVisible()
    await expect(this.heroImageRequiredMessage).toBeVisible()
    await expect(this.productsImageRequiredMessage).toBeVisible()
  }

  async addProduct(
    title: string,
    category: string,
    price: string,
    maxQuantity: string
  ) {
    await this.addProductButton.click()
    await this.productTitleInput.fill(title)
    await this.productCategorySelect.click()
    await this.page.getByLabel(category, { exact: true }).click()
    await this.productPriceInput.fill(price)
    await this.productMaxQuantityInput.fill(maxQuantity)
    await this.heroImageInput.setInputFiles(
      path.join(__dirname, '../images/go.png')
    )
    await this.productsImageInput.setInputFiles([
      path.join(__dirname, '../images/go-zero.png'),
    ])
    await this.submitButton.click()
    await expect(this.createSuccessMessage).toBeVisible({ timeout: 15000 })
  }

  async deleteProduct(title: string) {
    const targetRow = this.page.getByRole('row', { name: title })
    await targetRow.locator('.lucide-trash2').click()
    await this.deleteButton.click()
    await expect(this.deleteSuccessMessage).toBeVisible({ timeout: 15000 })
  }

  async editProduct(title: string) {
    const targetRow = this.page.getByRole('row', { name: title })

    const [targetRowCategory, targetRowPrice, targetRowMaxQuantity] =
      await Promise.all([
        targetRow.getByRole('cell').nth(1).textContent(),
        targetRow.getByRole('cell').nth(2).textContent(),
        targetRow.getByRole('cell').nth(3).textContent(),
      ])

    // 点击编辑按钮
    await targetRow.locator('.lucide-pencil').click()
    // 验证数据回填
    await expect(this.productCategorySelect).toHaveText(
      targetRowCategory as string
    )
    await expect(this.productPriceInput).toHaveValue(targetRowPrice as string)
    await expect(this.productMaxQuantityInput).toHaveValue(
      targetRowMaxQuantity as string
    )

    // 提交编辑后的数据
    await this.submitButton.click()
    await expect(this.editSuccessMessage).toBeVisible({ timeout: 15000 })
  }
}
