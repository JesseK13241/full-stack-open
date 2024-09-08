CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author TEXT,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    likes INTEGER
);

INSERT INTO blogs (author, url, title, likes)
VALUES
    ('Example Author', 'https://www.example.com', 'Example', 5),
    ('GitHub Author', 'https://www.github.com', 'GitHub', 10);