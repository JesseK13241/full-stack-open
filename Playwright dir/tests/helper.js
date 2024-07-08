const loginWith = async (page, username, password) => {
    await page.getByRole('button', { name: 'login' }).click()
    await page.getByRole('textbox').first().fill(username)
    await page.getByRole('textbox').last().fill(password)
    await page.getByRole('button', { name: 'login' }).click()
}

const logout = async (page) => {
    await page.getByRole('button', { name: 'Logout' }).click()
}

const createBlog = async (page, title, author, url) => {
    await page.getByRole('button', { name: 'new blog' }).click()
    const textboxes = await page.getByRole('textbox').all()
    await textboxes[0].fill(title)
    await textboxes[1].fill(author)
    await textboxes[2].fill(url)
    await page.getByRole('button', { name: 'create' }).click()
    await page.getByText("Title:" + title).waitFor()
}

const likeByTitle = async (page, title) => {
    const blogElement = await page.getByText("Title:" + title).locator('..')
    await blogElement.getByRole('button', { name: 'view' }).click()
    await blogElement.getByRole('button', { name: 'LIKE' }).click()
    await blogElement.getByRole('button', { name: 'hide' }).click()
}

export { loginWith, createBlog, logout, likeByTitle }

