import test from '@playwright/test'
import { AdminLayout } from '../pages/adminLayout'
import { AuthPage } from '../pages/authPage'

test.describe('Logout functionality', () => {
  test('Logout', async ({ browser }) => {
    const context = await browser.newContext({
      storageState: 'tests/.auth/logout.json', // 使用 user 的状态文件
    })
    const page = await context.newPage()

    const authPage = new AuthPage(page)
    await authPage.navigate()
    await authPage.login('test@test.com', '123456')

    // 测试登出逻辑
    const adminLayout = new AdminLayout(page)
    await adminLayout.navigateToRadomPage() // 跳转到随机页面
    await adminLayout.logout()

    // 验证已退出（比如应该重定向到登录页）

    await context.close()
  })
})
