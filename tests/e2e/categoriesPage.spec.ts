import test from '../fixtures/pageFixtrue'
import { faker } from '@faker-js/faker'

test.describe('Categories Page', () => {
  test('navigate to dashboard page', async ({ categoriesPage }) => {
    await categoriesPage.navigate()
    await categoriesPage.navigateToDashboard()
  })

  test('navigate to orders page', async ({ categoriesPage }) => {
    await categoriesPage.navigate()
    await categoriesPage.navigateToOrders()
  })

  test('navigate to products page', async ({ categoriesPage }) => {
    await categoriesPage.navigate()
    await categoriesPage.navigateToProducts()
  })

  test('add new category', async ({ categoriesPage }) => {
    const categoryName = faker.commerce.productName()
    await categoriesPage.navigate()
    await categoriesPage.addCategory(categoryName)
    await categoriesPage.deleteCategory(categoryName)
  })

  test('delete category', async ({ categoriesPage }) => {
    const categoryName = faker.commerce.productName()
    await categoriesPage.navigate()
    await categoriesPage.addCategory(categoryName)
    await categoriesPage.deleteCategory(categoryName)
  })

  test('eidt category', async ({ categoriesPage }) => {
    const categoryName = faker.commerce.productName()
    await categoriesPage.navigate()
    await categoriesPage.addCategory(categoryName)
    await categoriesPage.editCategory(categoryName)
    await categoriesPage.deleteCategory(categoryName)
  })
})
