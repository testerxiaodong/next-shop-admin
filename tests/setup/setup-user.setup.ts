import { test as setup } from '@playwright/test'
import path from 'path'

const authFile = path.join(__dirname, '../.auth/user.json')

setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto('/auth')
  await page.getByLabel('Email').fill('test@user.com')
  await page.getByLabel('Password').fill('123456')
  await page.getByText('Login').click()
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL('http://localhost:3000/admin/dashboard', {
    waitUntil: 'load',
  })
  // Alternatively, you can wait until the page reaches a state where all cookies are set.

  // End of authentication steps.

  await page.context().storageState({ path: authFile })
})
