const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
require('dotenv').config();

mongoose.set('strictQuery', false);
const MONGODB_URI = process.env.MONGODB_URI;

console.log('connecting to', MONGODB_URI);

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 4
    },
    born: {
        type: Number,
    },
});

authorSchema.plugin(uniqueValidator);
const Author = mongoose.model('Author', authorSchema);

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: 5
    },
    published: {
        type: Number,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
    genres: [
        { type: String }
    ]
});

bookSchema.plugin(uniqueValidator);
const Book = mongoose.model('Book', bookSchema);

let authors = [
    {
        name: 'Robert Martin',
        born: 1952,
    },
    {
        name: 'Martin Fowler',
        born: 1963
    },
    {
        name: 'Fyodor Dostoevsky',
        born: 1821
    },
    {
        name: 'Joshua Kerievsky', // birthyear not known
    },
    {
        name: 'Sandi Metz', // birthyear not known
    },
];

let books = [
    {
        title: 'Clean Code',
        published: 2008,
        author: 'Robert Martin',
        genres: ['refactoring']
    },
    {
        title: 'Agile software development',
        published: 2002,
        author: 'Robert Martin',
        genres: ['agile', 'patterns', 'design']
    },
    {
        title: 'Refactoring, edition 2',
        published: 2018,
        author: 'Martin Fowler',
        genres: ['refactoring']
    },
    {
        title: 'Refactoring to patterns',
        published: 2008,
        author: 'Joshua Kerievsky',
        genres: ['refactoring', 'patterns']
    },
    {
        title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
        published: 2012,
        author: 'Sandi Metz',
        genres: ['refactoring', 'design']
    },
    {
        title: 'Crime and punishment',
        published: 1866,
        author: 'Fyodor Dostoevsky',
        genres: ['classic', 'crime']
    },
    {
        title: 'Demons',
        published: 1872,
        author: 'Fyodor Dostoevsky',
        genres: ['classic', 'revolution']
    },
];

async function populateDatabase() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('connected to MongoDB');

        // Clear existing data
        await Author.deleteMany({});
        await Book.deleteMany({});

        // Create authors and store their IDs
        const authorMap = new Map();
        for (const authorData of authors) {
            const author = new Author(authorData);
            await author.save();
            authorMap.set(author.name, author._id);
            console.log(`Author ${author.name} saved!`);
        }

        // Create books with author references
        for (const bookData of books) {
            const authorId = authorMap.get(bookData.author);
            if (!authorId) {
                console.log(`Author not found for book: ${bookData.title}`);
                continue;
            }
            const book = new Book({
                ...bookData,
                author: authorId
            });
            await book.save();
            console.log(`Book ${book.title} saved!`);
        }

        console.log('Database population completed.');
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await mongoose.connection.close();
        console.log('Database connection closed.');
    }
}

populateDatabase();