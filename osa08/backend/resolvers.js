const { GraphQLError } = require("graphql")
const jwt = require("jsonwebtoken")
const Author = require("./models/author")
const Book = require("./models/book")
const User = require("./models/user")
const { PubSub } = require("graphql-subscriptions")
const pubsub = new PubSub()

const resolvers = {
  Author: {
    bookCount: async root => {
      console.log("Fetching author book count.")
      return await Book.countDocuments({ author: root._id })
    }
  },
  Query: {
    allAuthors: async (root, args) => {
      console.log("Fetching all authors.")
      return Author.find({})
    },
    authorCount: async () => {
      console.log("Fetching author count.")
      return Author.collection.countDocuments()
    },
    allBooks: async (root, { author, genre }) => {
      let query = {}
      console.log(`Searching with author '${author}' and genre '${genre}'`)
      if (author) {
        const authorObj = await Author.findOne({ name: author })
        if (authorObj) {
          query.author = authorObj._id
        }
      }
      if (genre) {
        query.genres = genre
      }
      return await Book.find(query).populate("author")
    },
    bookCount: async () => {
      console.log("Fetching book count.")
      return Book.collection.countDocuments()
    },
    me: (root, args, context) => {
      console.log("Fetching current user.")
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      console.log("Attempting to add a new book.")
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: { code: "BAD_USER_INPUT" }
        })
      }

      if (!args.author) {
        throw new GraphQLError("Author name is required", {
          extensions: { code: "BAD_USER_INPUT" }
        })
      }
      
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        console.log("Author not found for the new book. Creating new author for", args.author)
        author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError(error.message)
        }
      }
      const book = new Book({ ...args, author: author._id })
      try {
        await book.save()
        console.log("New book created.")
      } catch (error) {
        throw new GraphQLError(error.message)
      }
      pubsub.publish("BOOK_ADDED", { bookAdded: book })
      return book
    },
    addAuthor: async (root, args) => {
      const author = new Author({ ...args })
      try {
        await author.save()
        console.log("New author created.")
      } catch (error) {
        throw new GraphQLError(error.message)
      }
      return author
    },

    editAuthor: async (root, args, context) => {
      console.log("Attempting to edit author.")
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: { code: "BAD_USER_INPUT" }
        })
      }
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        console.log("Author not found.")
        return null
      }
      author.born = args.setBornTo
      try {
        await author.save()
        console.log("Author edit saved.")
      } catch (error) {
        throw new GraphQLError(error.message)
      }
      return author
    },
    createUser: async (root, args) => {
      console.log("Attempting to create a new user.")
      const user = new User({ username: args.username })

      return user.save().catch(error => {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error
          }
        })
      })
    },
    login: async (root, args) => {
      console.log("Attempting login.")
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT"
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    }
  },

  Subscription: {
    bookAdded: { subscribe: () => pubsub.asyncIterator("BOOK_ADDED") }
  }
}

module.exports = resolvers
