import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> calls with correct data', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()

  render(<BlogForm createBlog={createBlog} />)

  screen.debug()

  const titleInput = screen.getByPlaceholderText('new blog title')
  const authorInput = screen.getByPlaceholderText('new blog author')
  const urlInput = screen.getByPlaceholderText('new blog url')
  const sendButton = screen.getByText('create')

  await user.type(titleInput, 'testing form title...')
  await user.type(authorInput, 'testing form author...')
  await user.type(urlInput, 'testing form url...')

  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)

  expect(createBlog.mock.calls[0][0].title).toBe('testing form title...')
  expect(createBlog.mock.calls[0][0].author).toBe('testing form author...')
  expect(createBlog.mock.calls[0][0].url).toBe('testing form url...')
})

/*

<body>
  <div>
    <h2>
      Create new
    </h2>
    <form>
      title:
      <input
        value=""
      />
      <br />
      author:
      <input
        value=""
      />
      <br />
      url:
      <input
        value=""
      />
      <br />
      <button
        type="submit"
      >
        create
      </button>
    </form>
  </div>
</body>

*/
