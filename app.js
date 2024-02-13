const express = require('express');
const session = require("express-session");
const mysql = require("mysql");
const ejs = require('ejs');
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();

const app = express();
const port = 4000;

// Set up sessions
app.use(
  session({
    secret: "hemot",
    resave: true,
    saveUninitialized: true,
  })
);

// Set view engine and static folder
app.set('view engine', 'ejs');
app.use(express.static('public'));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "hemotracker"
});
connection.connect(function (error) {
  if (error) {
    console.error("Error connecting to database:", error.message);
  } else {
    console.log("Connected to the database successfully!");
  }
});

// Import Routes
const donorRoutes = require('./routes/donorRoutes');
const acceptRoutes = require('./routes/acceptRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Use Routes
app.use('/accept', acceptRoutes);
app.use('/admin', adminRoutes);
app.use('/', donorRoutes);


// Route to handle form submission and insert data into database
app.post('/dreg', encoder, function (req, res) {
  var rfirstname = req.body.firstname;
  var rlastname = req.body.lastname;
  var rgender = req.body.gender;
  var rage = req.body.age; 
  var rdob = req.body.dob; 
  var remail = req.body.email;
  var rblood = req.body.blood;
  var rpassword = req.body.password;
  var rcity = req.body.city;
  var rstate = req.body.state;
  var rphno = req.body.phno;
  var rpin = req.body.pincode;
  

  // Insert data into the database
  connection.query("INSERT INTO `donor` (`don_fname`, `don_lname`, `don_gender`, `don_age`, `don_dob`, `don_mail`, `don_blood`, `don_phno`, `don_location`, `don_state`, `don_password`, `don_pin`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[rfirstname, rlastname, rgender, rage, rdob, remail, rblood, rphno, rcity, rstate, rpassword, rpin], (error, results, fields) => {
    if (error) {
      console.error("Error inserting data into database:", error.message);
      return res.status(500).send("Error registering user.");
    }
    console.log("User registered successfully!");
    res.redirect('/dlog'); // Redirect to login page after successful registration
  });
});
// Route to handle login form submission of donor
app.post('/dlog', encoder, function (req, res) {
  var email = req.body.donmail;
  var password = req.body.donpass;

  // Query the database to check if the user exists
  connection.query("SELECT * FROM `donor` WHERE `don_mail` = ? AND `don_password` = ?", [email, password], (error, results, fields) => {

      if (error) {
          console.error("Error querying database:", error.message);
          return res.status(500).send("Error logging in.");
      }
      // If user exists, redirect to home page
      if (results.length > 0) {
           // Save user data in session upon successful login
          req.session.user = results[0];
          console.log("User logged in successfully!");
          res.redirect('/home');
      } else {
          // If user does not exist or credentials are incorrect, render an error message or redirect back to login page
          console.log("Invalid email or password");
          res.redirect('/dlog'); 
      }
  });
  });
// ---------------------------------------------------------------------------
// Route to handle form submission and insert data into database
app.post('/accept/accreg', encoder, function (req, res) {
  var lfirstname = req.body.firstname;
  var llastname = req.body.lastname;
  var lgender = req.body.gender;
  var lemail = req.body.email;
  var lpassword = req.body.password;
  var lphno = req.body.phno;

  // Insert data into the database
  connection.query("INSERT INTO `acceptor` (`acc_fname`, `acc_lname`, `acc_gender`, `acc_mail`, `acc_phno`, `acc_password`) VALUES (?, ?, ?, ?, ?, ?)",
    [lfirstname, llastname, lgender, lemail, lphno,  lpassword], (error, results, fields) => {
      if (error) {
        console.error("Error inserting data into database:", error.message);
        return res.status(500).send("Error registering user.");
      }

      // User registered successfully!
      console.log("User registered successfully!");

      // Send a success message to the registration page
      res.render('acceptor/accregister', { successMessage: "Registration successful! You can now log in." });
  });
});

// Route to handle login form submission
app.post('/accept/acclog', encoder, function (req, res) {
  var acemail = req.body.accmail;
  var acepassword = req.body.accpass;

  // Query the database to check if the user exists
  connection.query("SELECT * FROM `acceptor` WHERE `acc_mail` = ? AND `acc_password` = ?", [acemail, acepassword], (error, results, fields) => {
      if (error) {
          console.error("Error querying database:", error.message);
          return res.status(500).send("Error logging in.");
      }
      // If user exists, redirect to home page
      if (results.length > 0) {
           // Save user data in session upon successful login
          req.session.user = results[0];
          console.log("User logged in successfully!");
          res.redirect('/accept/acchom');
      } else {
          // If user does not exist or credentials are incorrect, render an error message or redirect back to login page
          console.log("Invalid email or password");
          res.redirect('/accept/acclog'); 
      }
  });
  });
// -----------------------------------------------------------------------------------
// Route to render the page and fetch donor data and locations
// Route to render the page and fetch donor data and locations
app.get('/accept/acchom', (req, res) => {
  // Fetch location and blood group from query parameters
  const location = req.query.location;
  const bloodGroup = req.query.bloodGroup;

  // Build the SQL query based on the selected location and blood group
  let query = 'SELECT * FROM donor';
  const queryParams = [];

  if (location && bloodGroup) {
    query += ' WHERE don_location = ? AND don_blood = ?';
    queryParams.push(location, bloodGroup);
  } else if (location) {
    query += ' WHERE don_location = ?';
    queryParams.push(location);
  } else if (bloodGroup) {
    query += ' WHERE don_blood = ?';
    queryParams.push(bloodGroup);
  }

  // Execute the SQL query with parameters
  connection.query(query, queryParams, (error, donorResults, fields) => {
    if (error) {
      console.log('Error fetching donor data from the database:', error);
      res.status(500).send('Internal Server Error');
    } else {
      // Fetch unique locations from donor data
      connection.query('SELECT DISTINCT don_location FROM donor', (error, locationResults, fields) => {
        if (error) {
          console.log('Error fetching locations from the database:', error);
          res.status(500).send('Internal Server Error');
        } else {
          // Pass donor data and locations to the template
          res.render('acceptor/acchome', { donors: donorResults, locations: locationResults });
        }
      });
    }
  });
});

// Route to render the page and fetch acceptor data and locations
app.get('/home', (req, res) => {
  // Fetch donor data
  connection.query('SELECT * FROM acceptor', (error, acceptResults, fields) => {
    if (error) {
      console.log('Error fetching acceptor data from the database:', error);
      res.status(500).send('Internal Server Error');
    } else {
      // Fetch unique locations from donor data
      connection.query('SELECT DISTINCT acc_location FROM acceptor', (error, locationResults, fields) => {
        if (error) {
          console.log('Error fetching locations from the database:', error);
          res.status(500).send('Internal Server Error');
        } else {
          // Pass donor data and locations to the template
          res.render('donor/home', { acceptors: acceptResults, locations: locationResults });
        }
      });
    }
  });
});
//--------------------------------------------------------------------------------------
// Route to handle login form submission
app.post('/admin/adlog', encoder, function (req, res) {
  var ademail = req.body.ademail;
  var adpassword = req.body.adpass;

  // Query the database to check if the user exists
  connection.query("SELECT * FROM `admin` WHERE `admin_email` = ? AND `admin_password` = ?", [ademail, adpassword], (error, results, fields) => {
      if (error) {
          console.error("Error querying database:", error.message);
          return res.status(500).send("Error logging in.");
      }
      // If user exists, redirect to home page
      if (results.length > 0) {
           // Save user data in session upon successful login
          req.session.user = results[0];
          console.log("User logged in successfully!");
          res.redirect('/admin/addash');
      } else {
          // If user does not exist or credentials are incorrect, render an error message or redirect back to login page
          console.log("Invalid email or password");
          res.redirect('/admin/acclog'); 
      }
  });
  });
// -----------------------------------------------------------------------------------


//Port displaying
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});