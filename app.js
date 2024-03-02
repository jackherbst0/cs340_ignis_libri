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
    ROUTES
*/

// Route to render your HTML page
app.get('/members', function(req, res) {
    db.pool.query('SELECT * FROM Members', function(err, results, fields) {
        if (err) {
            console.error("Error querying database: " + err);
            return;
        }
        // Render the HTML file with the retrieved data using Handlebars
        res.render('members', { results: results});
    });
});

app.get('/movies', function(req,res){
    res.render('movies');
});

app.get('/books', function(req,res){
    res.render('books');
});

app.get('/bookinfo', function(req,res){
    res.render('bookinfo');
});

app.get('/borrowings', function(req,res){
    res.render('borrowings');
});

app.get('/movieinfo', function(req,res){
    res.render('movieinfo');
});


// Route to handle the form submission and perform INSERT operation
app.post('/addNewMember', function(req, res) {
    const newName = req.body.new_name;
    const newAddress = req.body.new_address;
    const newPhone = req.body.new_phone;
    const newEmail = req.body.new_email;

    // Perform the INSERT operation in the database
    db.pool.query('INSERT INTO Members (name, address, phone, email) VALUES (?, ?, ?, ?)', [newName, newAddress, newPhone, newEmail], function(error, results, fields) {
        if (error) {
            console.error('Error inserting new member:', error);
            return res.status(500).send('Internal Server Error');
        }

        // Data inserted successfully
        res.send('New member added successfully');
    });
});


// Route to handle the form submission and perform UPDATE operation
app.post('/updateMember', function(req, res) {
    const memberId = req.body.member_id; // Assuming you have a member ID for updating
    const updatedName = req.body.name;
    const updatedAddress = req.body.address;
    const updatedPhone = req.body.phone;
    const updatedEmail = req.body.email;

    // Perform the UPDATE operation in the database
    db.pool.query('UPDATE Members SET name=?, address=?, phone=?, email=? WHERE member_id=?', [updatedName, updatedAddress, updatedPhone, updatedEmail, memberId], function(error, results, fields) {
        if (error) {
            console.error('Error updating member:', error);
            return res.status(500).json({ error: 'Internal Server Error', details: error.message });
        }

        // Data updated successfully
        res.json({ message: 'Member updated successfully' }); 

        /*
        IDK why but i could only get it to work with json. The other ones use send()
        */
    });
});



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
        res.send('Member deleted successfully');
    });
});

/*
    LISTENER
*/
app.listen(PORT, function() {
    console.log('Express started on flip1.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.')
});