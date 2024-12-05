import test from '../fixtures/pageFixtrue'

test.describe('Dashboard Page', () => {
  test('ordersChartCheck', async ({ dashboardPage }) => {
    await dashboardPage.navigate()
    await dashboardPage.ordersChartCheck()
  })
  test('productDistributionCheck', async ({ dashboardPage }) => {
    await dashboardPage.navigate()
    await dashboardPage.productDistributionCheck()
  })
  test('productsPerCategoryChartCheck', async ({ dashboardPage }) => {
    await dashboardPage.navigate()
    await dashboardPage.productsPerCategoryChartCheck()
  })
  test('latestUsersChartCheck', async ({ dashboardPage }) => {
    await dashboardPage.navigate()
    await dashboardPage.latestUsersChartCheck()
  })
  test('navigateToOrdersPage', async ({ dashboardPage }) => {
    await dashboardPage.navigate()
    await dashboardPage.navigateToOrdersPage()
  })
  test('navigateToProductsPage', async ({ dashboardPage }) => {
    await dashboardPage.navigate()
    await dashboardPage.navigateToProductsPage()
  })
  test('navigateToCategoriesPage', async ({ dashboardPage }) => {
    await dashboardPage.navigate()
    await dashboardPage.navigateToCategoriesPage()
  })
})
