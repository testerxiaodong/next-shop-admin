import { test } from '../fixtures/lighthouseFixture'

test.describe.serial('Lighthouse', () => {
  test('check home page performance', async ({
    browserName,
    playwright,
    lighthouse,
  }) => {
    test.skip(browserName !== 'chromium', 'Run only on chromium')

    const browser = await playwright['chromium'].launch({
      args: ['--remote-debugging-port=9222'],
    })

    try {
      const page = await browser.newPage()
      await page.goto('/')

      await lighthouse(page, 'homePage', {
        thresholds: {
          performance: 0.9,
          'best-practices': 0.9,
          seo: 0.9,
        },
      })

      await page.close()
    } finally {
      await browser.close()
    }
  })
  test('check auth page performance', async ({
    browserName,
    playwright,
    lighthouse,
  }) => {
    test.skip(browserName !== 'chromium', 'Run only on chromium')

    const browser = await playwright['chromium'].launch({
      args: ['--remote-debugging-port=9222'],
    })

    try {
      const page = await browser.newPage()
      await page.goto('/auth')

      await lighthouse(page, 'authPage', {
        thresholds: {
          performance: 0.9,
          'best-practices': 0.9,
          seo: 0.9,
        },
      })

      await page.close()
    } finally {
      await browser.close()
    }
  })
  test('check dashboard page performance', async ({
    browserName,
    playwright,
    lighthouse,
  }) => {
    test.skip(browserName !== 'chromium', 'Run only on chromium')

    const browser = await playwright['chromium'].launch({
      args: ['--remote-debugging-port=9222'],
    })

    try {
      const page = await browser.newPage({
        storageState: 'tests/.auth/admin.json',
      })
      await page.goto('/admin/dashboard')

      // 读取并解析 cookies
      const cookies = await page.context().cookies()
      const cookieString = cookies
        .map((cookie) => `${cookie.name}=${cookie.value}`)
        .join('; ')

      // 将 cookies 传递给 Lighthouse
      await lighthouse(page, 'dashboardPage', {
        thresholds: {
          performance: 0.9,
          'best-practices': 0.9,
          seo: 0.9,
        },
        // 这里可以添加其他选项，例如 cookies
        extraHeaders: {
          Cookie: cookieString,
        },
      })

      await page.close()
    } finally {
      await browser.close()
    }
  })
  test('check orders page performance', async ({
    browserName,
    playwright,
    lighthouse,
  }) => {
    test.skip(browserName !== 'chromium', 'Run only on chromium')

    const browser = await playwright['chromium'].launch({
      args: ['--remote-debugging-port=9222'],
    })

    try {
      const page = await browser.newPage({
        storageState: 'tests/.auth/admin.json',
      })
      await page.goto('/admin/orders')

      // 读取并解析 cookies
      const cookies = await page.context().cookies()
      const cookieString = cookies
        .map((cookie) => `${cookie.name}=${cookie.value}`)
        .join('; ')

      // 将 cookies 传递给 Lighthouse
      await lighthouse(page, 'ordersPage', {
        thresholds: {
          performance: 0.9,
          'best-practices': 0.9,
          seo: 0.9,
        },
        // 这里可以添加其他选项，例如 cookies
        extraHeaders: {
          Cookie: cookieString,
        },
      })

      await page.close()
    } finally {
      await browser.close()
    }
  })
  test('check products page performance', async ({
    browserName,
    playwright,
    lighthouse,
  }) => {
    test.skip(browserName !== 'chromium', 'Run only on chromium')

    const browser = await playwright['chromium'].launch({
      args: ['--remote-debugging-port=9222'],
    })

    try {
      const page = await browser.newPage({
        storageState: 'tests/.auth/admin.json',
      })
      await page.goto('/admin/products')

      // 读取并解析 cookies
      const cookies = await page.context().cookies()
      const cookieString = cookies
        .map((cookie) => `${cookie.name}=${cookie.value}`)
        .join('; ')

      // 将 cookies 传递给 Lighthouse
      await lighthouse(page, 'productsPage', {
        thresholds: {
          performance: 0.9,
          'best-practices': 0.9,
          seo: 0.9,
        },
        // 这里可以添加其他选项，例如 cookies
        extraHeaders: {
          Cookie: cookieString,
        },
      })

      await page.close()
    } finally {
      await browser.close()
    }
  })
  test('check categories page performance', async ({
    browserName,
    playwright,
    lighthouse,
  }) => {
    test.skip(browserName !== 'chromium', 'Run only on chromium')

    const browser = await playwright['chromium'].launch({
      args: ['--remote-debugging-port=9222'],
    })

    try {
      const page = await browser.newPage({
        storageState: 'tests/.auth/admin.json',
      })
      await page.goto('/admin/categories')

      // 读取并解析 cookies
      const cookies = await page.context().cookies()
      const cookieString = cookies
        .map((cookie) => `${cookie.name}=${cookie.value}`)
        .join('; ')

      // 将 cookies 传递给 Lighthouse
      await lighthouse(page, 'categoriesPage', {
        thresholds: {
          performance: 0.9,
          'best-practices': 0.9,
          seo: 0.9,
        },
        // 这里可以添加其他选项，例如 cookies
        extraHeaders: {
          Cookie: cookieString,
        },
      })

      await page.close()
    } finally {
      await browser.close()
    }
  })
})
