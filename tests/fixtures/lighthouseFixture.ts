import { Page, test as base } from '@playwright/test'
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
    async function loadLighthouse(
      page: Page,
      reportFileName: string,
      options?: {
        thresholds?: LighthouseCategories
        extraHeaders?: Record<string, string>
      }
    ) {
      const thresholds: LighthouseCategories =
        options?.thresholds || defaultThresholds
      const categories = Object.keys(thresholds)

      const { default: lighthouse } = await import('lighthouse')

      const runnerResult = await lighthouse(page.url(), {
        port: 9222,
        logLevel: 'error',
        onlyCategories: categories,
        output: 'html',
        extraHeaders: options?.extraHeaders,
      })

      if (!runnerResult) throw new Error('Lighthouse failed to run')
      const reportHtml = Array.isArray(runnerResult.report)
        ? runnerResult.report.join('') // 将数组连接成字符串
        : runnerResult.report // 如果是字符串，直接使用

      fs.writeFileSync(`lighthouse-report/${reportFileName}.html`, reportHtml)
    }

    await use(loadLighthouse)
  },
})
