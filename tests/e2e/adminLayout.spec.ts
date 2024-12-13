import { test } from '../fixtures/pageFixtrue'

test.describe('admin layout common functions', () => {
  test('should toggle light theme', async ({ adminLayout }) => {
    await adminLayout.navigateToRadomPage()
    await adminLayout.toggleLightTheme()
  })

  test('should toggle dark theme', async ({ adminLayout }) => {
    await adminLayout.navigateToRadomPage()
    await adminLayout.toggleDarkTheme()
  })

  test('should toggle system with light theme', async ({ adminLayout }) => {
    await adminLayout.navigateToRadomPage()
    await adminLayout.toggleSystemWithLightTheme()
  })

  test('should toggle system with dark theme', async ({ adminLayout }) => {
    await adminLayout.navigateToRadomPage()
    await adminLayout.toggleSystemWithDarkTheme()
  })
})
