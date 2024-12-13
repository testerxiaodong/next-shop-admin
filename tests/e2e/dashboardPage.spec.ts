import { test } from '../fixtures/pageFixtrue'

test.describe('Dashboard Page', () => {
  test('ordersc chart check', async ({ dashboardPage }) => {
    await dashboardPage.navigate()
    await dashboardPage.ordersChartCheck()
  })
  test('product distribution chart check', async ({ dashboardPage }) => {
    await dashboardPage.navigate()
    await dashboardPage.productDistributionChartCheck()
  })
  test('products per category chart check', async ({ dashboardPage }) => {
    await dashboardPage.navigate()
    await dashboardPage.productsPerCategoryChartCheck()
  })
  test('latestUsers chart check', async ({ dashboardPage }) => {
    await dashboardPage.navigate()
    await dashboardPage.latestUsersChartCheck()
  })
  test('navigate to orders page', async ({ dashboardPage }) => {
    await dashboardPage.navigate()
    await dashboardPage.navigateToOrdersPage()
  })
  test('navigate to products page', async ({ dashboardPage }) => {
    await dashboardPage.navigate()
    await dashboardPage.navigateToProductsPage()
  })
  test('navigate to categories page', async ({ dashboardPage }) => {
    await dashboardPage.navigate()
    await dashboardPage.navigateToCategoriesPage()
  })
})
