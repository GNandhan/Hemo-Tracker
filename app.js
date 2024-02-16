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


// -------------------------------------------------------------------------------------------------------
// Route handler for the home page
app.get('/home', (req, res) => {
  // Check if user is logged in
  if (req.session.user) {
    // If logged in, retrieve user's information from session
    const user = req.session.user;

    // Fetch request data for the logged-in donor including acceptor details
    connection.query(
      'SELECT r.req_id, r.donor_id, r.acceptor_id, r.status, a.acc_fname, a.acc_lname, a.acc_gender, a.acc_mail, a.acc_phno ' +
      'FROM request r ' +
      'JOIN acceptor a ON r.acceptor_id = a.acc_id ' +
      'WHERE r.donor_id = ?',
      [user.don_id],
      (error, requestResults, fields) => {
        if (error) {
          console.log('Error fetching request data from the database:', error);
          res.status(500).send('Internal Server Error');
        } else {
          // Render the home page template and pass the user's information and request data to it
          res.render('donor/home', { user, requests: requestResults });
        }
      }
    );
  } else {
    // If user is not logged in, redirect to login page
    res.redirect('/dlog');
  }
});


// -------------------------------------------------------------------------------------------------------

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
          // Inject script to show Bootstrap alert message upon successful login
          const script = `
            <div class="alert alert-success alert-dismissible fade show" role="alert">
              <strong>Login successful!</strong> Welcome back, ${results[0].don_fname}!
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          `;
          res.send(script + '<script>window.location.href = "/home";</script>'); // Redirect to home page after showing alert
      } else {
          // If user does not exist or credentials are incorrect, render an error message or redirect back to login page
          console.log("Invalid email or password");
          res.redirect('/dlog'); 
      }
  });
});

// -------------------------------------------------------------------------------------------------------

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
      res.redirect('/accept/acclog');
  });
});
// -------------------------------------------------------------------------------------------------------
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
          console.log("Acceptor details:", req.session.user); // Log acceptor details
          res.redirect('/accept/acchom');
      } else {
          // If user does not exist or credentials are incorrect, render an error message or redirect back to login page
          console.log("Invalid email or password");
          res.redirect('/accept/acclog'); 
      }
  });
});
// -------------------------------------------------------------------------------------------------------
// Route to render the page and fetch donor data based on search parameters
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
          // Fetch acceptor details from session
          const acceptorDetails = req.session.user;
          
          // Fetch request data for the logged-in acceptor
          connection.query(
            'SELECT r.req_id, r.donor_id, r.acceptor_id, r.status, d.don_fname, d.don_lname, d.don_blood ' +
            'FROM request r ' +
            'JOIN donor d ON r.donor_id = d.don_id ' +
            'WHERE r.acceptor_id = ?',
            [acceptorDetails.acc_id],
            (error, requestResults, fields) => {
              if (error) {
                console.log('Error fetching request data from the database:', error);
                res.status(500).send('Internal Server Error');
              } else {
                // Pass donor data, locations, and request data to the template
                res.render('acceptor/acchome', { donors: donorResults, locations: locationResults, acceptor: acceptorDetails, requests: requestResults });
              }
            }
          );
        }
      });
    }
  });
});


// -------------------------------------------------------------------------------------------------------

// Route to handle sending request
app.post('/accept/sendRequest', encoder, function (req, res) {
  // Retrieve donor ID from the form
  const donorId = req.body.donorId;

  // Log donorId to check its value
  console.log("Donor ID:", donorId);

  // Retrieve acceptor details from the session or wherever you store them
  const acceptorDetails = req.session.user; // Adjust accordingly

  // Check if acceptor details are available
  if (!acceptorDetails || !acceptorDetails.acc_id) {
    console.error("Acceptor details not found in session.");
    console.log("Session data:", req.session); // Log session data
    return res.status(500).send("Error sending request. Acceptor details not found.");
  }

  // Log acceptor details for debugging
  console.log("Acceptor details:", acceptorDetails);

  // Store the request details in the database
  connection.query("INSERT INTO `request` (`donor_id`, `acceptor_id`, `status`) VALUES (?, ?, 'pending')",
    [donorId, acceptorDetails.acc_id], (error, results, fields) => {
      if (error) {
        console.error("Error inserting request data into database:", error.message);
        return res.status(500).send("Error sending request.");
      }

      // Request sent successfully!
      console.log("Request sent successfully!");
      res.redirect('/accept/acchom?requestSent=true'); // Redirect back to the donor list page
    });
});

// -------------------------------------------------------------------------------------------------------
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
          // If user does not exist or credentials are incorrect, redirect back to login page with an error query parameter
          console.log("Invalid email or password");
          res.redirect('/admin/adlog?error=1'); 
      }
  });
});
// -------------------------------------------------------------------------------------------------------
// Route to render the donor page and fetch donor data
app.get('/admin/addonor', (req, res) => {
  // Fetch donor data from the database
  connection.query('SELECT * FROM donor', (error, donorResults, fields) => {
    if (error) {
      console.log('Error fetching donor data from the database:', error);
      res.status(500).send('Internal Server Error');
    } else {
      // Pass donor data to the template
      res.render('admin/admin-donor', { donors: donorResults });
    }
  });
});
// -------------------------------------------------------------------------------------------------------
// Route to render the donor page and fetch donor data
app.get('/admin/adaccept', (req, res) => {
  // Fetch donor data from the database
  connection.query('SELECT * FROM acceptor', (error, acceptResults, fields) => {
    if (error) {
      console.log('Error fetching donor data from the database:', error);
      res.status(500).send('Internal Server Error');
    } else {
      // Pass donor data to the template
      res.render('admin/admin-acceptor', { acceptors: acceptResults });
    }
  });
});
// -------------------------------------------------------------------------------------------------------

// Route to render the admin dashboard and fetch total counts of acceptors and donors
app.get('/admin/addash', (req, res) => {
  // Fetch total count of acceptors
  connection.query('SELECT COUNT(*) AS acceptorCount FROM acceptor', (error, acceptorCountResults, fields) => {
    if (error) {
      console.log('Error fetching acceptor count from the database:', error);
      res.status(500).send('Internal Server Error');
    } else {
      const acceptorCount = acceptorCountResults[0].acceptorCount;

      // Fetch total count of donors
      connection.query('SELECT COUNT(*) AS donorCount FROM donor', (error, donorCountResults, fields) => {
        if (error) {
          console.log('Error fetching donor count from the database:', error);
          res.status(500).send('Internal Server Error');
        } else {
          const donorCount = donorCountResults[0].donorCount;
          // total sum calculation
          const totalSum = acceptorCount + donorCount;

          // Render the admin dashboard view with acceptor and donor counts
          res.render('admin/admin-dashboard', { acceptorCount, donorCount, totalSum });
        }
      });
    }
  });
});
// -------------------------------------------------------------------------------------------------------

//Port displaying
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});