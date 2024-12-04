import test from '../fixtures/pageFixtrue'

test.describe('Auth Page', () => {
  test('should be able to login', async ({ authPage }) => {
    await authPage.navigate()
    await authPage.login('test@test.com', '123456')
  })

  test('should not be able to login with invalid credentials', async ({
    authPage,
  }) => {
    await authPage.navigate()
    await authPage.loginWithError('test@gmail.com', '1234567')
  })
})
