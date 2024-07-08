const { describe, beforeEach, test, expect } = require('@playwright/test')
const { loginWith, logout, createBlog, likeByTitle } = require('./helper')

describe('Blog app', () => {

  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'TESTING',
        username: 'test',
        password: 'test'
      }
    })
    await page.goto('http://localhost:5173')
  })

  test('front page can be opened', async ({ page }) => {
    const locator = await page.getByText('Blogs')
    await expect(locator).toBeVisible()
  })

  test('login fails with wrong password', async ({ page }) => {
    await loginWith(page, 'wrong', 'wrong')

    const errorDiv = await page.locator('.notification')
    await expect(errorDiv).toContainText('wrong credentials')
    await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

    await expect(page.getByText('logged in')).not.toBeVisible()
  })

  test('login works', async ({ page }) => {
    await loginWith(page, 'test', 'test')
    await expect(page.getByText('logged in')).toBeVisible()
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'test', 'test')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, "playwright blog title", "playwright blog author", "playwright blog url")
      await expect(page.getByText('Title:playwright blog title')).toBeVisible()
    })

    describe('and a blog exists', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, "1st playwright blog title", "1st playwright blog author", "1st playwright blog url")
      })
  
      test('like can be incremented', async ({ page }) => {
        await likeByTitle(page, "1st playwright blog title")
        const blogElement = await page.getByText("Title:1st playwright blog title").locator('..')
        await blogElement.getByRole('button', { name: 'view' }).click()
        await expect(page.getByText('Likes:1')).toBeVisible()
      })

      test('test deletion works', async ({ page }) => {
        page.on('dialog', async (dialog) => {
          await dialog.accept()
        });
        await expect(page.getByText('Title:1st playwright blog title')).toBeVisible()
        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'DELETE' }).click()
        await expect(page.getByText('Title:1st playwright blog title')).not.toBeVisible()
      })

      test("can't see delete if blog by some other user", async ({ page, request }) => {
        await logout(page)
        await request.post('http://localhost:3001/api/users', {
          data: {
            name: 'TESTING2',
            username: 'test2',
            password: 'test2'
          }
        })
        await loginWith(page, 'test2', 'test2')
        await expect(page.getByText('Title:1st playwright blog title')).toBeVisible()
        await page.getByRole('button', { name: 'view' }).click()
        await expect(page.getByRole('button', { name: 'DELETE' })).not.toBeVisible()
      })

      test("blogs are ordered by likes", async ({page}) => {
        await createBlog(page, "2nd blog title", "2nd blog author", "2nd blog url")
        await createBlog(page, "3rd blog title", "3rd blog author", "3rd blog url")
        
        await likeByTitle(page, "3rd blog title")

        await likeByTitle(page, "2nd blog title")
        await likeByTitle(page, "2nd blog title")

        // 2 > 3 > 1

        const blogElements = await page.locator("p.blogtitle").all()

        const firstElem = await blogElements[0].textContent()
        expect(firstElem).toContain("2")

        const secondElem = await blogElements[1].textContent()
        expect(secondElem).toContain("3")

        const thirdElem = await blogElements[2].textContent()
        expect(thirdElem).toContain("1")
        
      })

    })

  })  

})

