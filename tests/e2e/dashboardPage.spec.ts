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
})
