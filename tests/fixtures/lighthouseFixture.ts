import { Page, test as base, expect as baseExpect } from '@playwright/test'
import fs from 'fs'

type LighthouseCategories = Partial<{
  performance: number
  accessibility: number
  'best-practices': number
  seo: number
  pwa: number
}>

const defaultThresholds: LighthouseCategories = {
  performance: 0.9,
  accessibility: 0.9,
  'best-practices': 0.9,
  seo: 0.9,
  pwa: 0.9,
}

// 扩展性能阈值断言的expect函数
const expect = baseExpect.extend({
  toMatchThresholds(
    received: LighthouseCategories,
    expected: LighthouseCategories
  ) {
    // 比较期望的阈值以及测试结果分数
    const pass = Object.entries(expected).every(([category, threshold]) => {
      const receivedScore = received[category as keyof LighthouseCategories]
      return (receivedScore || 0) >= threshold
    })
    const message = pass
      ? () =>
          `Expected: ${this.utils.printExpected(
            expected
          )}\nReceived: ${this.utils.printReceived(received)}`
      : () =>
          `Expected: ${this.utils.printExpected(
            expected
          )}\nReceived: ${this.utils.printReceived(
            received
          )}\n\n${this.utils.diff(expected, received)}`
    return {
      message,
      pass,
    }
  },
})

export const test = base.extend<{
  lighthouse: (
    page: Page,
    reportFileName: string,
    options?: {
      thresholds?: LighthouseCategories
      extraHeaders?: Record<string, string>
    }
  ) => Promise<void>
}>({
  lighthouse: async ({}, use) => {
    /**
     *
     * @param page 传入的Playwright.Page实例
     * @param reportFileName 想要写入的报告名称
     * @param options 阈值以及额外的头部(用于身份认证)
     */
    async function loadLighthouse(
      page: Page,
      reportFileName: string,
      options?: {
        thresholds?: LighthouseCategories
        extraHeaders?: Record<string, string>
      }
    ) {
      // 合并阈值配置
      const thresholds: LighthouseCategories =
        options?.thresholds || defaultThresholds
      const categories = Object.keys(thresholds)
      // 调用lighthouseApi
      const { default: lighthouse } = await import('lighthouse')
      const runnerResult = await lighthouse(
        page.url(),
        // Flags
        {
          port: 9222,
          logLevel: 'error',
          onlyCategories: categories,
          output: 'html',
          extraHeaders: options?.extraHeaders,
        },
        // Config
        {
          extends: 'lighthouse:default',
          // 为了能得到较高分数，使用桌面端，提高网络配置
          settings: {
            formFactor: 'desktop',
            screenEmulation: {
              mobile: false,
              width: 1920,
              height: 1080,
              deviceScaleFactor: 1,
              disabled: false,
            },
            throttling: {
              rttMs: 40,
              throughputKbps: 10240,
              cpuSlowdownMultiplier: 1,
            },
          },
        }
      )

      if (!runnerResult) throw new Error('Lighthouse failed to run')
      // 把结果写入文件
      const reportHtml = Array.isArray(runnerResult.report)
        ? runnerResult.report.join('')
        : runnerResult.report
      fs.writeFileSync(`lighthouse-report/${reportFileName}.html`, reportHtml)
      // 阈值断言
      const categoriesScores: LighthouseCategories = Object.entries(
        runnerResult.lhr.categories
      ).reduce((acc, curr) => {
        if (!thresholds[curr[0] as keyof LighthouseCategories]) return acc
        const category = curr[0] as keyof LighthouseCategories
        acc[category] = curr[1].score ?? undefined
        return acc
      }, {} as LighthouseCategories)
      console.log('categoriesScores: ', categoriesScores)
      expect(categoriesScores).toMatchThresholds(thresholds)
    }

    await use(loadLighthouse)
  },
})
