import test from '../fixtures/pageFixtrue'

test.describe('Products Page', () => {
  test('navigateToDashboard', async ({ productsPage }) => {
    await productsPage.navigate()
    await productsPage.navigateToDashboard()
  })

  test('navigateToOrdersPage', async ({ productsPage }) => {
    await productsPage.navigate()
    await productsPage.navigateToOrdersPage()
  })

  test('navigateToCategoriesPage', async ({ productsPage }) => {
    await productsPage.navigate()
    await productsPage.navigateToCategoriesPage()
  })

  test('add new product', async ({ productsPage }) => {
    await productsPage.navigate()
    await productsPage.addProduct()
  })
})
