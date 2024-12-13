import { expect, Locator, Page } from '@playwright/test'
import { HelperBase } from './helperBase'
import path from 'path'

export class CategoriesPage extends HelperBase {
  readonly dashboardPageLink: Locator
  readonly ordersPageLink: Locator
  readonly productsPageLink: Locator
  // 添加分类按钮
  readonly addCategoryButton: Locator
  // 表单验证提示
  readonly formValidationNameMessage: Locator
  readonly formValidationImageMessage: Locator
  // 分类名称输入框
  readonly categoryNameInput: Locator
  // 分类图片上传控件
  readonly categoryImageInput: Locator
  // 提交按钮
  readonly submitButton: Locator
  // 新增分类成功提示
  readonly createSuccessMessage: Locator
  // 确认删除按钮
  readonly confirmDeleteButton: Locator
  // 删除分类成功提示
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
    this.productsPageLink = this.page.getByRole('link', {
      name: 'Products',
    })
    // 添加分类按钮
    this.addCategoryButton = this.page.getByRole('button', {
      name: 'Add Category',
    })
    this.formValidationNameMessage = this.page.getByText('分类名称是必填项')
    this.formValidationImageMessage = this.page.getByText('Invalid url')
    this.categoryNameInput = this.page.getByLabel('Name')
    this.categoryImageInput = this.page.getByLabel('Image')
    this.submitButton = this.page.getByRole('button', {
      name: 'Submit',
    })
    this.createSuccessMessage = this.page.getByText(
      'Category created successfully'
    )
    this.confirmDeleteButton = this.page.getByRole('button', {
      name: 'Confirm Delete',
    })
    this.deleteSuccessMessage = this.page.getByText(
      'Category deleted successfully'
    )
    this.editSuccessMessage = this.page.getByText(
      'Category updated successfully'
    )
  }

  async navigate() {
    await this.page.goto('/admin/categories')
  }

  async navigateToDashboard() {
    await this.dashboardPageLink.click()
    await this.page.waitForURL('http://localhost:3000/admin/dashboard')
    await expect(this.page.getByText('Dashboard Overview')).toBeVisible()
  }

  async navigateToOrders() {
    await this.ordersPageLink.click()
    await this.page.waitForURL('http://localhost:3000/admin/orders')
    await expect(
      this.page.getByText('Orders Management Dashboard')
    ).toBeVisible()
  }

  async navigateToProducts() {
    await this.productsPageLink.click()
    await this.page.waitForURL('http://localhost:3000/admin/products')
    await expect(this.page.getByText('Products Management')).toBeVisible()
  }

  async formvalidationErrorMessages() {
    await this.addCategoryButton.click()
    await this.submitButton.click()
    await expect(this.formValidationNameMessage).toBeVisible()
    await expect(this.formValidationImageMessage).toBeVisible()
  }

  async addCategory(name: string) {
    await this.addCategoryButton.click()
    await this.categoryNameInput.fill(name)
    await this.categoryImageInput.setInputFiles(
      path.join(__dirname, '../images/go.png')
    )
    await this.submitButton.click()
    await expect(this.createSuccessMessage).toBeVisible({ timeout: 15000 })
  }

  async deleteCategory(categoryName: string) {
    const targetRow = this.page.getByRole('row', { name: categoryName })
    await targetRow.locator('.lucide-ellipsis').click()
    await this.page.getByText('Delete').click()
    await this.confirmDeleteButton.click()
    await expect(this.deleteSuccessMessage).toBeVisible({ timeout: 15000 })
  }

  async editCategory(categoryName: string) {
    const targetRow = this.page.getByRole('row', { name: categoryName })
    await targetRow.locator('.lucide-ellipsis').click()
    await this.page.getByText('Edit').click()
    await this.submitButton.click()
    await expect(this.editSuccessMessage).toBeVisible({ timeout: 15000 })
  }
}
