import { test } from '../fixtures/pageFixtrue'

test.describe('Home page', () => {
  test('home page header show', async ({ homePage }) => {
    await homePage.navigate()
    await homePage.headerShow()
  })

  test('go to github', async ({ homePage }) => {
    await homePage.navigate()
    await homePage.gotoGithub()
  })
})
