import { expect, Locator, Page } from '@playwright/test'
import { HelperBase } from './helperBase'

export class HomePage extends HelperBase {
  readonly appHeader: Locator
  readonly githubLink: Locator

  constructor(page: Page) {
    super(page)
    this.appHeader = this.page.locator('h1', { hasText: 'GadgetApp' })
    this.githubLink = this.page.getByText('@ cengdong')
  }

  async navigate() {
    await this.page.goto('/')
  }

  async headerShow() {
    await expect(this.appHeader).toBeVisible()
  }

  async gotoGithub() {
    // 监听新页面打开
    const [newPage] = await Promise.all([
      this.page.waitForEvent('popup'), // 等待新页面
      this.githubLink.click(), // 点击触发跳转
    ])

    // 等待新页面加载完成
    await newPage.waitForLoadState()

    // 验证新页面 URL
    expect(newPage.url()).toBe('https://github.com/testerxiaodong')

    // 验证页面标题
    const title = await newPage.title()
    expect(title).toContain('GitHub')
  }
}
