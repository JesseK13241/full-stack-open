import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('Renders correctly', async () => {
  const blogToRender = {
    title: 'Component testing is done with react-testing-library',
    author: 'Anonymous author',
    url: 'Unknown URL',
    likes: 0,
    user: { username: 'none' },
  }

  const mockHandler = vi.fn()

  const { container } = render(<Blog blog={blogToRender} updateBlog={mockHandler} />)

  screen.debug()

  const titleElement = container.querySelector('#blogtitle')
  expect(titleElement).toHaveTextContent('Title:Component testing is done with react-testing-library')

  const authorElement = screen.queryByText('Author:Anonymous author')
  expect(authorElement.parentElement).toHaveStyle('display: none')

  const urlElement = screen.queryByText('URL:Unknown URL')
  expect(urlElement.parentElement).toHaveStyle('display: none')

  const likesElement = screen.queryByText('Likes:0')
  expect(likesElement.parentElement).toHaveStyle('display: none')

  const userElement = screen.queryByText('User:none')
  expect(userElement.parentElement).toHaveStyle('display: none')

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const authorElementNow = screen.queryByText('Author:Anonymous author')
  expect(authorElementNow.parentElement).not.toHaveStyle('display: none')

  const urlElementNow = screen.queryByText('URL:Unknown URL')
  expect(urlElementNow.parentElement).not.toHaveStyle('display: none')

  const likesElementNow = screen.queryByText('Likes:0')
  expect(likesElementNow.parentElement).not.toHaveStyle('display: none')

  const userElementNow = screen.queryByText('User:none')
  expect(userElementNow.parentElement).not.toHaveStyle('display: none')

  const userDirver = userEvent.setup()
  const likeButton = screen.getByText('LIKE')
  await userDirver.click(likeButton)
  await userDirver.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
