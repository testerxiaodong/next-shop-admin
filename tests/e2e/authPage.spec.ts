import test from '../fixtures/pageFixtrue'

test.describe('Auth Page', () => {
  // 表单验证错误信息验证
  test('login with form validation error', async ({ authPage }) => {
    await authPage.navigate()
    await authPage.loginWithFormValidationError()
  })
  // 登录成功验证
  test('should be able to login', async ({ authPage }) => {
    await authPage.navigate()
    await authPage.login('test@test.com', '123456')
  })
  // 登录失败验证
  test('should not be able to login with invalid credentials', async ({
    authPage,
  }) => {
    await authPage.navigate()
    await authPage.loginWithError('test@gmail.com', '1234567')
  })
})
