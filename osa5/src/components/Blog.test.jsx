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

  const { container } = render(<Blog blog={blogToRender} />)

  screen.debug()

  const titleElement = container.querySelector('#blogtitle')
  expect(titleElement).toHaveTextContent('Title:Component testing is done with react-testing-library')

  const authorElement = screen.queryByText('Author:Anonymous author')
  expect(authorElement.parentElement).toHaveStyle('display: none')

  const urlElement = screen.queryByText('URL:Unknown URL')
  expect(urlElement.parentElement).toHaveStyle('display: none')

  /* const mockHandler = vi.fn()
  const user = userEvent.setup()
  const button = screen.getByText('make not important')
  await user.click(button)
  expect(mockHandler.mock.calls).toHaveLength(1) */
})
