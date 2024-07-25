const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require("@apollo/server/standalone")
const { GraphQLError } = require("graphql")
const gql = require("graphql-tag")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const Author = require("./models/author")
const Book = require("./models/book")
const User = require("./models/user")
require("dotenv").config()

mongoose.set("strictQuery", false)
const MONGODB_URI = process.env.MONGODB_URI
console.log("connecting to", MONGODB_URI)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB")
  })
  .catch(error => {
    console.log("error connection to MongoDB:", error.message)
  })

const typeDefs = gql`
  type User {
    username: String!
    friends: [User!]!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book

    addAuthor(name: String!, born: Int): Author
    editAuthor(name: String!, setBornTo: Int!): Author

    createUser(username: String!): User

    login(username: String!, password: String!): Token
  }
`

const resolvers = {
  Author: {
    bookCount: async root => {
      return await Book.countDocuments({ author: root._id })
    }
  },
  Query: {
    allAuthors: async (root, args) => {
      return Author.find({})
    },
    authorCount: async () => Author.collection.countDocuments(),
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
    bookCount: async () => Book.collection.countDocuments(),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: { code: "BAD_USER_INPUT" }
        })
      }

      let author = await Author.findOne({ name: args.author })
      if (!author) {
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
      } catch (error) {
        throw new GraphQLError(error.message)
      }
      return book
    },
    addAuthor: async (root, args) => {
      const author = new Author({ ...args })
      try {
        await author.save()
      } catch (error) {
        throw new GraphQLError(error.message)
      }
      return author
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: { code: "BAD_USER_INPUT" }
        })
      }
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }
      author.born = args.setBornTo
      try {
        await author.save()
      } catch (error) {
        throw new GraphQLError(error.message)
      }
      return author
    },
    createUser: async (root, args) => {
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
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id).populate(
        "friends"
      )
      return { currentUser }
    }
  }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
