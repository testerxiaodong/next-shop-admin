import test from '../fixtures/pageFixtrue'
import { faker } from '@faker-js/faker'

test.describe('Products Page', () => {
  test('navigate to dashboard page', async ({ productsPage }) => {
    await productsPage.navigate()
    await productsPage.navigateToDashboard()
  })

  test('navigate to Orders page', async ({ productsPage }) => {
    await productsPage.navigate()
    await productsPage.navigateToOrdersPage()
  })

  test('navigate to categories page', async ({ productsPage }) => {
    await productsPage.navigate()
    await productsPage.navigateToCategoriesPage()
  })

  test('form validation error message', async ({ productsPage }) => {
    await productsPage.navigate()
    await productsPage.formValidationErrorMessages()
  })

  test('add new product', async ({ productsPage }) => {
    // 生成一个随机产品名称
    const productTitle = faker.commerce.productName()
    await productsPage.navigate()
    await productsPage.addProduct(productTitle, 'Phones', '100', '100')
    await productsPage.deleteProduct(productTitle)
  })

  test('delete product', async ({ productsPage }) => {
    // 生成一个随机产品名称
    const productTitle = faker.commerce.productName()
    await productsPage.navigate()
    // 先添加一个产品
    await productsPage.addProduct(productTitle, 'Phones', '100', '100')
    // 删除这个产品
    await productsPage.deleteProduct(productTitle)
  })

  test('edit product', async ({ productsPage }) => {
    test.slow()
    await productsPage.navigate()
    // 生成一个随机产品名称
    const productTitle = faker.commerce.productName()
    await productsPage.addProduct(productTitle, 'Phones', '100', '100')
    // 编辑这个产品
    await productsPage.editProduct(productTitle)
    // 再次删除这个产品
    await productsPage.deleteProduct(productTitle)
  })
})
