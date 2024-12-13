import { expect, Locator, Page } from '@playwright/test'
import { HelperBase } from './helperBase'

export class AuthPage extends HelperBase {
  readonly email: Locator
  readonly password: Locator
  readonly loginButton: Locator
  readonly successMessage: Locator
  readonly errorMessage: Locator
  readonly formValidationEmailError: Locator
  readonly formValidationPasswordError: Locator

  constructor(page: Page) {
    super(page)
    this.email = this.page.getByLabel('Email')
    this.password = this.page.getByLabel('Password')
    this.loginButton = this.page.getByText('Login')
    this.successMessage = this.page.getByText('Logged in successfully')
    this.errorMessage = this.page.getByText('Invalid email or password')
    this.formValidationEmailError = this.page.getByText('Invalid email address')
    this.formValidationPasswordError = this.page.getByText(
      'Password must be at least 6 characters'
    )
  }

  async navigate() {
    await this.page.goto('/auth')
  }

  async login(email: string, password: string) {
    await this.email.fill(email)
    await this.password.fill(password)
    await this.loginButton.click()
    // 等待消息可见并验证内容
    await expect(this.successMessage).toHaveText('Logged in successfully', {
      timeout: 8000,
    })
    await this.page.waitForURL('http://localhost:3000/admin/dashboard', {
      waitUntil: 'load',
    })
    const dashboardHeader = this.page.locator('main h1', {
      hasText: 'Dashboard Overview',
    })
    await expect(dashboardHeader).toBeVisible()
  }

  async loginWithFormValidationError() {
    await this.loginButton.click()
    await expect(this.formValidationEmailError).toBeVisible()
    await expect(this.formValidationPasswordError).toBeVisible()
  }

  async loginWithError(email: string, password: string) {
    await this.email.fill(email)
    await this.password.fill(password)
    await this.loginButton.click()
    // 等待消息可见并验证内容
    await expect(this.errorMessage).toHaveText('Invalid email or password', {
      timeout: 8000,
    })
  }
}
