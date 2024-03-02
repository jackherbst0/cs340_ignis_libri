/*
CS 340 - Intro to Databases - Winter 2024
Team 128: Busy Bees - Theo Saad Doolittle Sweilem & John Herbst
Project Title: Ignis Libri Library
*/


/* Drop tables if they exist*/
DROP TABLE IF EXISTS Borrowings;
DROP TABLE IF EXISTS Books;
DROP TABLE IF EXISTS Movies;
DROP TABLE IF EXISTS MovieInfo;
DROP TABLE IF EXISTS BookInfo;
DROP TABLE IF EXISTS Members;

/* Recreate tables */

-- Members table
CREATE TABLE Members (
    member_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone VARCHAR(12) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);

-- BookInfo table
CREATE TABLE BookInfo (
    isbn VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    publication VARCHAR(255) NOT NULL
);

-- Books table
CREATE TABLE Books (
    book_id INT PRIMARY KEY,
    isbn VARCHAR(50),
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    genre VARCHAR(50) NOT NULL,
    published YEAR,
    FOREIGN KEY (isbn) REFERENCES BookInfo(isbn) ON DELETE CASCADE
);

-- MovieInfo table
CREATE TABLE MovieInfo (
    info_id INT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    director VARCHAR(255) NOT NULL,
    rating DECIMAL(3, 1) NOT NULL
);

-- Movies table
CREATE TABLE Movies (
    movie_id INT PRIMARY KEY,
    info_id INT,
    title VARCHAR(255) NOT NULL,
    genre VARCHAR(50) NOT NULL,
    release_year YEAR NOT NULL,
    FOREIGN KEY (info_id) REFERENCES MovieInfo(info_id) ON DELETE CASCADE
);

-- Borrowings table
CREATE TABLE Borrowings (
    borrowing_id INT PRIMARY KEY,
    member_id INT,
    book_id INT,
    movie_id INT,
    borrow_date DATE NOT NULL,
    return_date DATE NOT NULL,
    FOREIGN KEY (member_id) REFERENCES Members(member_id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES Books(book_id) ON DELETE CASCADE,
    FOREIGN KEY (movie_id) REFERENCES Movies(movie_id) ON DELETE CASCADE
);

-- Insert data into Members table
INSERT IGNORE INTO Members (name, address, phone, email) VALUES
('John Doe', '123 Main St', '555-1234', 'john.doe@example.com'),
('Jane Smith', '456 Oak St', '555-5678', 'jane.smith@example.com'),
('Bob Johnson', '789 Pine St', '555-9012', 'bob.johnson@example.com');

-- Insert data into BookInfo table
INSERT IGNORE INTO BookInfo (isbn, title, author, publication) VALUES
('978-0-14-240733-2', 'The Great Gatsby', 'F. Scott Fitzgerald', 'Scribner'),
('978-0-06-112008-4', 'To Kill a Mockingbird', 'Harper Lee', 'Harper Perennial'),
('978-0-452-28423-4', '1984', 'George Orwell', 'Signet Classics');

-- Insert data into Books table
INSERT IGNORE INTO Books (book_id, isbn, title, author, genre, published) VALUES
(101, '978-0-14-240733-2', 'The Great Gatsby', 'F. Scott Fitzgerald', 'Classic', 1925),
(102, '978-0-06-112008-4', 'To Kill a Mockingbird', 'Harper Lee', 'Fiction', 1960),
(103, '978-0-452-28423-4', '1984', 'George Orwell', 'Dystopian', 1949);

-- Insert data into MovieInfo table
INSERT IGNORE INTO MovieInfo (info_id, title, director, rating) VALUES
(301, 'Inception', 'Christopher Nolan', 8.8),
(302, 'The Shawshank Redemption', 'Frank Darabont', 9.3),
(303, 'Pulp Fiction', 'Quentin Tarantino', 8.9);

-- Insert data into Movies table
INSERT IGNORE INTO Movies (movie_id, info_id, title, genre, release_year) VALUES
(401, 301, 'Inception', 'Sci-Fi', 2010),
(402, 302, 'The Shawshank Redemption', 'Drama', 1994),
(403, 303, 'Pulp Fiction', 'Crime', 1994);

-- Insert data into Borrowings table
INSERT IGNORE INTO Borrowings (borrowing_id, member_id, book_id, movie_id, borrow_date, return_date) VALUES
(204, 1, 102, NULL, '2024-02-20', '2024-02-28'),  -- Borrowing a book
(205, 2, NULL, 403, '2024-02-22', '2024-03-01'),  -- Borrowing a movie
(206, 3, 103, NULL, '2024-02-25', '2024-03-05'),  -- Borrowing a book
(207, 1, NULL, 401, '2024-03-10', '2024-03-20'),  -- Borrowing a movie
(208, 2, 101, NULL, '2024-03-15', '2024-03-25');  -- Borrowing a book



SET FOREIGN_KEY_CHECKS=1;

COMMIT;