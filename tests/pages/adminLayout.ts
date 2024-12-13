import { expect, Locator, Page } from '@playwright/test'
import { HelperBase } from './helperBase'
import { getRandomElement } from '../lib/utils'

export class AdminLayout extends HelperBase {
  readonly allLinksInAdminLayout: string[]
  readonly userProfileButton: Locator
  readonly logoutButton: Locator
  readonly toggleThemeButton: Locator
  readonly lightThemeButton: Locator
  readonly darkThemeButton: Locator
  readonly systemThemeButton: Locator

  constructor(page: Page) {
    super(page)
    this.allLinksInAdminLayout = [
      '/admin/dashboard',
      '/admin/orders',
      '/admin/products',
      '/admin/categories',
    ]
    this.userProfileButton = this.page.getByRole('button', {
      name: 'Toggle user menu',
    })
    this.logoutButton = this.page.getByRole('menuitem', { name: 'Logout' })
    this.toggleThemeButton = this.page.getByRole('button', {
      name: 'Toggle theme',
    })
    this.lightThemeButton = this.page.getByRole('menuitem', {
      name: 'Light',
    })
    this.darkThemeButton = this.page.getByRole('menuitem', {
      name: 'Dark',
    })
    this.systemThemeButton = this.page.getByRole('menuitem', {
      name: 'System',
    })
  }

  async navigateToRadomPage() {
    const randomLink = getRandomElement(this.allLinksInAdminLayout)
    await this.page.goto(randomLink as string)
  }

  async logout() {
    await this.userProfileButton.click()
    await this.logoutButton.click()
    await this.page.waitForURL('/')
    await expect(
      this.page.locator('h1', { hasText: 'GadgetApp' })
    ).toBeVisible()
  }

  async toggleLightTheme() {
    await this.userProfileButton.click()
    await this.toggleThemeButton.click()
    await this.lightThemeButton.click()
    await expect(this.page.locator('html')).toHaveClass('light')
  }

  async toggleDarkTheme() {
    await this.userProfileButton.click()
    await this.toggleThemeButton.click()
    await this.darkThemeButton.click()
    await expect(this.page.locator('html')).toHaveClass('dark')
  }

  async toggleSystemWithLightTheme() {
    // 模拟系统主题为 Light
    await this.page.emulateMedia({ colorScheme: 'light' })
    await this.userProfileButton.click()
    await this.toggleThemeButton.click()
    await this.systemThemeButton.click()
    await expect(this.page.locator('html')).toHaveClass('light')
  }

  async toggleSystemWithDarkTheme() {
    // 模拟系统主题为 Dark
    await this.page.emulateMedia({ colorScheme: 'dark' })
    await this.userProfileButton.click()
    await this.toggleThemeButton.click()
    await this.systemThemeButton.click()
    await expect(this.page.locator('html')).toHaveClass('dark')
  }
}
