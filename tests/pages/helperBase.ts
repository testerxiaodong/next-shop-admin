import { Page } from '@playwright/test'

export class HelperBase {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async waitNumberOfScconds(secondsNumber: number) {
    await this.page.waitForTimeout(secondsNumber * 1000)
  }
}
