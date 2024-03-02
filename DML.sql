/********************************
CS 340 - Intro to Databases - Winter 2024
Team 128: Busy Bees - Theo Saad Doolittle Sweilem & John Herbst
Project Title: Ignis Libri Library
*********************************/


/********************************

Select statements for each table

*********************************/

-- SELECT statement for Members table
SELECT * FROM Members;

-- SELECT statement for BookInfo table
SELECT * FROM BookInfo;

-- SELECT statement for Books table
SELECT * FROM Books;

-- SELECT statement for MovieInfo table
SELECT * FROM MovieInfo;

-- SELECT statement for Movies table
SELECT * FROM Movies;

-- SELECT statement for Borrowings table
SELECT * FROM Borrowings;

/********************************

Some querys using JOIN:

*********************************/

-- SELECT statement for Members table with Borrowings information
SELECT Members.member_id, Members.name, Members.address, Members.phone, Members.email,
       Borrowings.borrowing_id, Borrowings.book_id, Borrowings.movie_id, Borrowings.borrow_date, Borrowings.return_date
FROM Members
LEFT JOIN Borrowings ON Members.member_id = Borrowings.member_id;

-- SELECT statement for Books table with BookInfo information
SELECT Books.book_id, BookInfo.isbn, BookInfo.title AS book_title, BookInfo.author, BookInfo.publication, Books.genre, Books.published
FROM Books
LEFT JOIN BookInfo ON Books.isbn = BookInfo.isbn;

-- SELECT statement for Movies table with MovieInfo information
SELECT Movies.movie_id, MovieInfo.info_id, MovieInfo.title AS movie_title, MovieInfo.director, MovieInfo.rating, Movies.genre, Movies.release_year
FROM Movies
LEFT JOIN MovieInfo ON Movies.info_id = MovieInfo.info_id;


/********************************

Search/Filter select statement:

*********************************/
-- Retrieve books of the same genre
DECLARE :selectedGenre VARCHAR(50) = 'Fiction'; -- Replace with the desired genre

SELECT *
FROM Books
WHERE genre = :selectedGenre;

/********************************

Insert statements for every table in schema:

*********************************/

/*  Insert a new member with variable denotation using : prefix
    Example Input:
   
    INSERT IGNORE INTO Members (member_id, name, address, phone, email)
    VALUES (4, 'New Member', '789 Oak St', '555-6789', 'new.member@example.com');
*/
INSERT IGNORE INTO Members (member_id, name, address, phone, email)
VALUES (:memberIdInput, :nameInput, :addressInput, :phoneInput, :emailInput);

/*  Insert new book info using variable denotation with : prefix
    
    Example Input:
    
    INSERT IGNORE INTO BookInfo (isbn, title, author, publication)
    VALUES 
    ('978-0-123-45678-9', 'Example Book 1', 'John Author', '2022-01-01'),
    ('978-0-987-65432-1', 'Example Book 2', 'Jane Writer', '2021-05-15');
    
*/
INSERT IGNORE INTO BookInfo (isbn, title, author, publication)
VALUES (:isbnInput, :titleInput, :authorInput, :publicationInput);


/*  Insert a new book with variable denotation using : prefix

    ** If you get a warning, run the following command first:

    INSERT IGNORE INTO BookInfo (isbn, title, author, publication)
    VALUES 
    ('978-0-123-45678-9', 'New Book', 'New Author', '2022-01-01');

    Example Input:

    INSERT IGNORE INTO Books (book_id, isbn, title, author, genre, published)
    VALUES (104, '978-0-123-45678-9', 'New Book', 'New Author', 'Mystery', 2022);
*/
INSERT IGNORE INTO Books (book_id, isbn, title, author, genre, published)
VALUES (:bookIdInput, :isbnInput, :titleInput, :authorInput, :genreInput, :publishedInput);


/*  Insert new movie info using variable denotation with : prefix
    
    Example Input:
   
    INSERT IGNORE INTO MovieInfo (info_id, title, director, rating)
    VALUES 
    (304, 'Example Movie 1', 'John Director', 8.5),
    (305, 'Example Movie 2', 'Jane Filmmaker', 9.0);
*/
INSERT IGNORE INTO MovieInfo (info_id, title, director, rating)
VALUES (:infoIdInput, :titleInput, :directorInput, :ratingInput);


/*  Insert a new movie with variable denotation using : prefix

    ** If you get a warning, run the following command first:

    INSERT IGNORE INTO MovieInfo (info_id, title, director, rating)
    VALUES 
    (304, 'Example Movie 1', 'John Director', 8.5);

    Example Input:

    INSERT IGNORE INTO Movies (movie_id, info_id, title, genre, release_year)
    VALUES (404, 304, 'New Movie', 'Action', 2023);
*/
INSERT IGNORE INTO Movies (movie_id, info_id, title, genre, release_year)
VALUES (:movieIdInput, :infoIdInput, :titleInput, :genreInput, :releaseYearInput);

/*  Insert a new borrowing transaction with variable denotation using : prefix ********
    
    Example Input: 

    INSERT IGNORE INTO Borrowings (borrowing_id, member_id, book_id, movie_id, borrow_date, return_date)
    VALUES (209, 1, 101, NULL, '2024-03-30', '2024-04-05'), (210, 1, NULL, 401, '2024-03-30', '2024-04-05');
*/  
INSERT IGNORE INTO Borrowings (borrowing_id, member_id, book_id, movie_id, borrow_date, return_date)
VALUES (:borrowingIdInput, :memberIdInput, :bookIdInput, :movieIdInput, :borrowDateInput, :returnDateInput);

/********************************

Delete statements for every table in schema:

*********************************/

/*  Delete a member based on member_id

    Example Input:
   
    DELETE FROM Members
    WHERE member_id = 3;
*/
DELETE FROM Members
WHERE member_id = :memberIdToDelete;

/*  Delete a book info based on isbn

    Example Input:
   
    DELETE FROM BookInfo
    WHERE isbn = '978-0-452-28423-4';
*/
DELETE FROM BookInfo
WHERE isbn = :isbnToDelete;

/*  Delete a book based on book_id

    Example Input:

    DELETE FROM Books
    WHERE book_id = 103;
*/
DELETE FROM Books
WHERE book_id = :bookIdToDelete;

/*  Delete movie info based on movie_id
    
    Example Input:

    DELETE FROM MovieInfo
    WHERE info_id = 303;
*/
DELETE FROM MovieInfo
WHERE info_id = :infoIdToDelete;

/*  Delete a movie based on movie_id ***

    Example Input:
   
    DELETE FROM Movies
    WHERE movie_id = 403;
*/
DELETE FROM Movies
WHERE movie_id = :movieIdToDelete;

/*  Delete a borrowing transaction based on borrowing_id

    Example Input:

    DELETE FROM Borrowings
    WHERE borrowing_id = 208;
*/
DELETE FROM Borrowings
WHERE borrowing_id = :borrowingIdToDelete;

/********************************

Update statements for every table in schema:

*********************************/

/*  Update member information based on member_id

    Example Input:

    UPDATE Members
    SET name = 'Updated Name', address = 'Updated Address', phone = '555-4321'
    WHERE member_id = 3;
*/
UPDATE Members
SET name = :newNameInput, address = :newAddressInput, phone = :newPhoneInput
WHERE member_id = :memberIdToUpdate;

/* Update book info based on isbn
    
    Example Input:

    UPDATE BookInfo
    SET title = 'Updated Title', author = 'Updated Author', publication = '2023-02-28'
    WHERE isbn = '978-0-452-28423-4';   
*/
UPDATE BookInfo
SET title = :newTitleInput, author = :newAuthorInput, publication = :newPublicationInput
WHERE isbn = :isbnToUpdate;

/*  Update book information based on book_id 
    
    Example Input:
   
    UPDATE Books
    SET title = 'Updated Book Title', author = 'Updated Book Author', genre = 'Updated Genre'
    WHERE book_id = 103;
*/
UPDATE Books
SET title = :newTitleInput, author = :newAuthorInput, genre = :newGenreInput
WHERE book_id = :bookIdToUpdate;

/*  Update movie info based on movie_id
    
    Example Input:

    UPDATE MovieInfo
    SET title = 'Updated Title', director = 'Updated Director', rating = 8.8
    WHERE info_id = 303; 
*/
UPDATE MovieInfo
SET title = :newTitleInput, director = :newDirectorInput, rating = :newRatingInput
WHERE info_id = :infoIdToUpdate;

/*  Update movie information based on movie_id

    Example Input:

    UPDATE Movies
    SET title = 'Updated Movie Title', genre = 'Updated Genre'
    WHERE movie_id = 403;
*/
UPDATE Movies
SET title = :newTitleInput, genre = :newGenreInput
WHERE movie_id = :movieIdToUpdate;

/*  Update borrowing information based on borrowing_id

    Example Input:
   
    UPDATE Borrowings
    SET member_id = 1, book_id = 101, movie_id = NULL
    WHERE borrowing_id = 208;
*/
UPDATE Borrowings
SET member_id = :newMemberIdInput, book_id = :newBookIdInput, movie_id = :newMovieIdInput
WHERE borrowing_id = :borrowingIdToUpdate;