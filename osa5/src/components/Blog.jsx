const Blog = ({ blog }) => {
  return (
    <div>
      Title: {blog.title}, Author: {blog.author}, URL: {blog.url}, USER: {blog.user.username}
    </div>
  )
}

export default Blog