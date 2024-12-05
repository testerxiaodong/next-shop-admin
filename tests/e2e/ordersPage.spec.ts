import test from '../fixtures/pageFixtrue'

test.describe('Orders Page', () => {
  test('navigateToDashboard', async ({ ordersPage }) => {
    await ordersPage.navigate()
    await ordersPage.navigateToDashboard()
  })

  test('navigateToProducts', async ({ ordersPage }) => {
    await ordersPage.navigate()
    await ordersPage.navigateToProducts()
  })

  test('navigateToCategories', async ({ ordersPage }) => {
    await ordersPage.navigate()
    await ordersPage.navigateToCategories()
  })

  test('changeOrderStatus', async ({ ordersPage }) => {
    await ordersPage.navigate()
    await ordersPage.changeOrderStatus()
  })

  test('viewOrderProducts', async ({ ordersPage }) => {
    await ordersPage.navigate()
    await ordersPage.viewOrderProducts()
  })
})
