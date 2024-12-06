import { expect, Page } from '@playwright/test'
import { HelperBase } from './helperBase'

export class AuthPage extends HelperBase {
  readonly email = this.page.getByLabel('Email')
  readonly password = this.page.getByLabel('Password')
  readonly loginButton = this.page.getByText('Login')
  readonly successMessage = this.page.getByText('Logged in successfully')
  readonly errorMessage = this.page.getByText('Invalid email or password')
  readonly formValidationEmailError = this.page.getByText(
    'Invalid email address'
  )
  readonly formValidationPasswordError = this.page.getByText(
    'Password must be at least 6 characters'
  )

  constructor(page: Page) {
    super(page)
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
      timeout: 4000,
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
      timeout: 4000,
    })
  }
}
