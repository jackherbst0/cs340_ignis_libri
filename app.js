// Import necessary modules
var express = require('express');
var exphbs = require('express-handlebars');
var path = require('path');

// Create an Express application
var app = express();
var PORT = 8459;

var db = require('./db-connector');

// Set the view engine to handlebars
app.engine('handlebars', exphbs.engine({ layoutsDir: __dirname + '/views/layouts', defaultLayout: false }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', function(req,res){
    res.render('index');
});

/*
    RENDERING ROUTES
*/

// Route to render your HTML page
app.get('/members', function(req, res) {
    db.pool.query('SELECT * FROM Members', function(err, results, fields) {
        if (err) {
            console.error("Error querying database: " + err);
            return;
        }
        // Render the HTML file with the retrieved data using Handlebars
        res.render('members', { members: results});
    });
});

app.get('/movies', function(req,res){
    db.pool.query('SELECT * FROM Movies', function(err, results, fields) {
        if (err) {
            console.error("Error querying database: " + err);
            return;
        }
        console.log(results)
        // Render the HTML file with the retrieved data using Handlebars
        res.render('movies', { movies: results});
    });
});

app.get('/books', function(req,res){
    db.pool.query('SELECT * FROM Books', function(err, results, fields) {
        if (err) {
            console.error("Error querying database: " + err);
            return;
        }
        // Render the HTML file with the retrieved data using Handlebars
        res.render('books', { books: results});
    });
});

app.get('/bookinfo', function(req,res){
    db.pool.query('SELECT * FROM BookInfo', function(err, results, fields) {
        if (err) {
            console.error("Error querying database: " + err);
            return;
        }
        console.log(results)
        // Render the HTML file with the retrieved data using Handlebars
        res.render('bookinfo', { bookinfo: results});
    });
});

app.get('/borrowings', function(req,res){
    db.pool.query('SELECT * FROM Borrowings', function(err, results, fields) {
        if (err) {
            console.error("Error querying database: " + err);
            return;
        }
        console.log(results)
        // Render the HTML file with the retrieved data using Handlebars
        res.render('borrowings', { borrowings: results});
    });
});

app.get('/movieinfo', function(req,res){
    db.pool.query('SELECT * FROM MovieInfo', function(err, results, fields) {
        if (err) {
            console.error("Error querying database: " + err);
            return;
        }
        console.log(results)
        // Render the HTML file with the retrieved data using Handlebars
        res.render('movieinfo', { movieinfo: results});
    });
});


/*
    ADDING ROUTES
*/


// Route to handle the form submission and perform INSERT operation
app.post('/addNewMember', function(req, res) {
    const newName = req.body.new_name;
    const newAddress = req.body.new_address;
    const newPhone = req.body.new_phone;
    const newEmail = req.body.new_email;

    // Perform the INSERT operation in the database
    db.pool.query('INSERT INTO Members (name, address, phone, email) VALUES (?, ?, ?, ?)', 
        [newName, newAddress, newPhone, newEmail], 
        function(error, results, fields) {
            if (error) {
                console.error('Error inserting new member:', error);
                return res.status(500).send('Internal Server Error');
            }

            res.redirect('http://flip4.engr.oregonstate.edu:8459/members');
        });
});

// Route to handle the form submission and perform INSERT operation for BookInfo
app.post('/addNewBookInfo', function(req, res) {
    const newISBN = req.body.new_isbn;
    const newTitle = req.body.new_title;
    const newAuthor = req.body.new_author;
    const newPublication = req.body.new_publication;

    // Perform the INSERT operation in the BookInfo table
    db.pool.query('INSERT INTO BookInfo (isbn, title, author, publication) VALUES (?, ?, ?, ?)',
        [newISBN, newTitle, newAuthor, newPublication],
        function(error, results, fields) {
            if (error) {
                console.error('Error inserting new book info:', error);
                return res.status(500).send('Internal Server Error');
            }

            // Data inserted successfully
            res.redirect('http://flip4.engr.oregonstate.edu:8459/bookinfo');
        });
});

// Route to handle the form submission and perform INSERT operation for MovieInfo
app.post('/addNewMovieInfo', function(req, res) {
    const newInfoId = req.body.new_info_id;
    const newTitle = req.body.new_title;
    const newDirector = req.body.new_director;
    const newRating = req.body.new_rating;

    // Perform the INSERT operation in the MovieInfo table
    db.pool.query('INSERT INTO MovieInfo (info_id, title, director, rating) VALUES (?, ?, ?, ?)',
        [newInfoId, newTitle, newDirector, newRating],
        function(error, results, fields) {
            if (error) {
                console.error('Error inserting new movie info:', error);
                return res.status(500).send('Internal Server Error');
            }

            // Data inserted successfully
            res.redirect('http://flip4.engr.oregonstate.edu:8459/movieinfo');
        });
});


// Route to handle the form submission and perform INSERT operation for Books
app.post('/addNewBook', function(req, res) {
    const newISBN = req.body.newisbn;
    const newTitle = req.body.newtitle;
    const newAuthor = req.body.newauthor;
    const newGenre = req.body.newgenre;
    const newPublished = req.body.newpublished;

    // Perform the INSERT operation in the Books table
    db.pool.query('INSERT INTO Books (isbn, title, author, genre, published) VALUES (?, ?, ?, ?, ?)',
        [newISBN, newTitle, newAuthor, newGenre, newPublished],
        function(error, results, fields) {
            if (error) {
                console.error('Error inserting new book:', error);
                return res.status(500).send('Internal Server Error');
            }

            // Data inserted successfully
            res.redirect('http://flip4.engr.oregonstate.edu:8459/books');
        });
});


// Route to handle the form submission and perform INSERT operation for Movies
app.post('/addNewMovie', function(req, res) {
    const newInfoId = req.body.new_info_id;
    const newTitle = req.body.new_title;
    const newGenre = req.body.new_genre;
    const newReleaseYear = req.body.new_release_year;

    // Perform the INSERT operation in the Movies table
    db.pool.query('INSERT INTO Movies (info_id, title, genre, release_year) VALUES (?, ?, ?, ?)',
        [newInfoId, newTitle, newGenre, newReleaseYear],
        function(error, results, fields) {
            if (error) {
                console.error('Error inserting new movie:', error);
                return res.status(500).send('Internal Server Error');
            }

            // Data inserted successfully
            res.redirect('http://flip4.engr.oregonstate.edu:8459/movies');
        });
});


/// Route to handle the form submission and perform INSERT operation for Borrowings
app.post('/addNewBorrowing', function(req, res) {
    const newMemberId = req.body.new_member_id;
    const newBookId = req.body.new_book_id;
    const newMovieId = req.body.new_movie_id;
    const newBorrowDate = req.body.new_borrow_date;
    const newReturnDate = req.body.new_return_date;

    // Convert empty strings to NULL for book_id and movie_id
    const formattedBookID = newBookId === '' ? null : newBookId;
    const formattedMovieID = newMovieId === '' ? null : newMovieId;

    // Perform the INSERT operation in the Borrowings table
    db.pool.query('INSERT INTO Borrowings (member_id, book_id, movie_id, borrow_date, return_date) VALUES (?, ?, ?, ?, ?)',
        [newMemberId, formattedBookID, formattedMovieID, newBorrowDate, newReturnDate],
        function(error, results, fields) {
            if (error) {
                console.error('Error inserting new borrowing:', error);
                return res.status(500).send('Internal Server Error');
            }

            // Data inserted successfully
            res.redirect('http://flip4.engr.oregonstate.edu:8459/borrowings');
        });
});



/*
    UPDATING ROUTES
*/

// Route to handle the form submission and perform UPDATE operation
app.post('/updateMember', function(req, res) {
    const memberId = req.body.member_id; // Assuming you have a member ID for updating
    const updatedName = req.body.name;
    const updatedAddress = req.body.address;
    const updatedPhone = req.body.phone;
    const updatedEmail = req.body.email;

    // Perform the UPDATE operation in the database
    db.pool.query('UPDATE Members SET name=?, address=?, phone=?, email=? WHERE member_id=?', 
        [updatedName, updatedAddress, updatedPhone, updatedEmail, memberId], 
        function(error, results, fields) {
        if (error) {
            console.error('Error updating member:', error);
            return res.status(500).json({ error: 'Internal Server Error', details: error.message });
        }

        // Data updated successfully
        res.redirect('http://flip4.engr.oregonstate.edu:8459/members');
    });
});

// Route to handle the form submission and perform UPDATE operation for BookInfo
app.post('/updateBookInfo', function(req, res) {
    const isbn = req.body.isbn; // Assuming you have the ISBN for updating
    const updatedTitle = req.body.title; // Assuming this is the new title
    const updatedAuthor = req.body.author; // Assuming this is the new author
    const updatedPublication = req.body.publication; // Assuming this is the new publication

    // Perform the UPDATE operation in the BookInfo table
    db.pool.query('UPDATE BookInfo SET title=?, author=?, publication=? WHERE isbn=?',
        [updatedTitle, updatedAuthor, updatedPublication, isbn],
        function(error, results, fields) {
            if (error) {
                console.error('Error updating book info:', error);
                return res.status(500).json({ error: 'Internal Server Error', details: error.message });
            }

            // Data updated successfully
            res.redirect('http://flip4.engr.oregonstate.edu:8459/bookinfo');
    });
});

// Route to handle the form submission and perform UPDATE operation for MovieInfo
app.post('/updateMovieInfo', function(req, res) {
    const infoId = req.body.movie_id; // Assuming you have an info ID for updating
    const updatedTitle = req.body.title; // Assuming this is the new title
    const updatedDirector = req.body.director; // Assuming this is the new director
    const updatedRating = req.body.rating; // Assuming this is the new rating

    // Perform the UPDATE operation in the MovieInfo table
    db.pool.query('UPDATE MovieInfo SET title=?, director=?, rating=? WHERE info_id=?',
        [updatedTitle, updatedDirector, updatedRating, infoId],
        function(error, results, fields) {
            if (error) {
                console.error('Error updating movie info:', error);
                return res.status(500).json({ error: 'Internal Server Error', details: error.message });
            }

            // Data updated successfully
            res.redirect('http://flip4.engr.oregonstate.edu:8459/movieinfo');
    });
});

// Route to handle the form submission and perform UPDATE operation for Books
app.post('/updateBook', function(req, res) {
    const bookId = req.body.book_id; // Assuming you have a book ID for updating
    const updatedISBN = req.body.isbn;
    const updatedTitle = req.body.title;
    const updatedAuthor = req.body.author;
    const updatedGenre = req.body.genre;
    const updatedPublished = req.body.published;

    // Perform the UPDATE operation in the Books table
    db.pool.query('UPDATE Books SET isbn=?, title=?, author=?, genre=?, published=? WHERE book_id=?',
        [updatedISBN, updatedTitle, updatedAuthor, updatedGenre, updatedPublished, bookId],
        function(error, results, fields) {
            if (error) {
                console.error('Error updating book:', error);
                return res.status(500).json({ error: 'Internal Server Error', details: error.message });
            }

            // Data updated successfully
            res.redirect('http://flip4.engr.oregonstate.edu:8459/books');
        });
});

// Route to handle the form submission and perform UPDATE operation for Movies
app.post('/updateMovie', function(req, res) {
    const movieId = req.body.movie_id; // Assuming you have a movie ID for updating
    const updatedInfoId = req.body.info_id;
    const updatedTitle = req.body.title;
    const updatedGenre = req.body.genre;
    const updatedReleaseYear = req.body.release_year;

    // Perform the UPDATE operation in the Movies table
    db.pool.query('UPDATE Movies SET info_id=?, title=?, genre=?, release_year=? WHERE movie_id=?',
        [updatedInfoId, updatedTitle, updatedGenre, updatedReleaseYear, movieId],
        function(error, results, fields) {
            if (error) {
                console.error('Error updating movie:', error);
                return res.status(500).json({ error: 'Internal Server Error', details: error.message });
            }

            // Data updated successfully
            res.redirect('http://flip4.engr.oregonstate.edu:8459/movies');
        });
});

// Route to handle the form submission and perform UPDATE operation for Borrowings
app.post('/updateBorrowing', function(req, res) {
    const borrowingId = req.body.borrowing_id; // Assuming you have a borrowing ID for updating
    const updatedMemberId = req.body.member_id;
    const updatedBookId = req.body.book_id;
    const updatedMovieId = req.body.movie_id;
    const updatedBorrowDate = req.body.borrow_date;
    const updatedReturnDate = req.body.return_date;

    // Convert empty strings to NULL for book_id and movie_id
    const formattedUpdatedBookID = updatedBookId === '' ? null : updatedBookId;
    const formattedUpdatedMovieID = updatedMovieId === '' ? null : updatedMovieId;

    // Perform the UPDATE operation in the Borrowings table
    db.pool.query('UPDATE Borrowings SET member_id=?, book_id=?, movie_id=?, borrow_date=?, return_date=? WHERE borrowing_id=?',
        [updatedMemberId, formattedUpdatedBookID, formattedUpdatedMovieID, updatedBorrowDate, updatedReturnDate, borrowingId],
        function(error, results, fields) {
            if (error) {
                console.error('Error updating borrowing:', error);
                return res.status(500).json({ error: 'Internal Server Error', details: error.message });
            }

            // Data updated successfully
            res.redirect('http://flip4.engr.oregonstate.edu:8459/borrowings');
        });
});



/*
    DELETING ROUTES
*/
// Route to handle the form submission and perform DELETE operation
app.post('/deleteMember', function(req, res) {
    const memberId = req.body.delete_member_id; // Assuming you have a member ID for deletion

    // Perform the DELETE operation in the database
    db.pool.query('DELETE FROM Members WHERE member_id=?', [memberId], function(error, results, fields) {
        if (error) {
            console.error('Error deleting member:', error);
            return res.status(500).json({ error: 'Internal Server Error', details: error.message });
        }

        // Data deleted successfully
        res.redirect('http://flip4.engr.oregonstate.edu:8459/members');
    });
});

// Route to handle the form submission and perform DELETE operation for BookInfo
app.post('/deleteBookInfo', function(req, res) {
    const isbn = req.body.delete_isbn; // Assuming you have an ISBN for deletion

    // Perform the DELETE operation in the BookInfo table
    db.pool.query('DELETE FROM BookInfo WHERE isbn=?', [isbn], function(error, results, fields) {
        if (error) {
            console.error('Error deleting book info:', error);
            return res.status(500).json({ error: 'Internal Server Error', details: error.message });
        }

        // Data deleted successfully
        res.redirect('http://flip4.engr.oregonstate.edu:8459/bookinfo');
    });
});

// Route to handle the form submission and perform DELETE operation for MovieInfo
app.post('/deleteMovieInfo', function(req, res) {
    const movieId = req.body.delete_movie_id;
    // Perform the DELETE operation in the MovieInfo table
    db.pool.query('DELETE FROM MovieInfo WHERE info_id=?', [movieId], function(error, results, fields) {
        if (error) {
            console.error('Error deleting movie info:', error);
            return res.status(500).json({ error: 'Internal Server Error', details: error.message });
        }

        // Data deleted successfully
        res.redirect('http://flip4.engr.oregonstate.edu:8459/movieinfo');
    });
});

// Route to handle the form submission and perform DELETE operation for Books
app.post('/deleteBook', function(req, res) {
    const bookId = req.body.deletebookid; // Assuming you have a book ID for deletion

    // Perform the DELETE operation in the Books table
    db.pool.query('DELETE FROM Books WHERE book_id=?', [bookId], function(error, results, fields) {
        if (error) {
            console.error('Error deleting book:', error);
            return res.status(500).json({ error: 'Internal Server Error', details: error.message });
        }

        // Data deleted successfully
        res.redirect('http://flip4.engr.oregonstate.edu:8459/books');
    });
});

// Route to handle the form submission and perform DELETE operation for Movies
app.post('/deleteMovie', function(req, res) {
    const movieId = req.body.delete_movie_id; // Assuming you have a movie ID for deletion

    // Perform the DELETE operation in the Movies table
    db.pool.query('DELETE FROM Movies WHERE movie_id=?', [movieId], function(error, results, fields) {
        if (error) {
            console.error('Error deleting movie:', error);
            return res.status(500).json({ error: 'Internal Server Error', details: error.message });
        }

        // Data deleted successfully
        res.redirect('http://flip4.engr.oregonstate.edu:8459/movies');
    });
});

// Route to handle the form submission and perform DELETE operation for Borrowings
app.post('/deleteBorrowing', function(req, res) {
    const borrowingId = req.body.delete_borrowing_id; // Assuming you have a borrowing ID for deletion

    // Perform the DELETE operation in the Borrowings table
    db.pool.query('DELETE FROM Borrowings WHERE borrowing_id=?', [borrowingId], function(error, results, fields) {
        if (error) {
            console.error('Error deleting borrowing:', error);
            return res.status(500).json({ error: 'Internal Server Error', details: error.message });
        }

        // Data deleted successfully
        res.redirect('http://flip4.engr.oregonstate.edu:8459/borrowings');
    });
});





/*
    LISTENER
*/
app.listen(PORT, function() {
    console.log('Express started on flip#.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.')
});