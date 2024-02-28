const express = require('express');
const session = require("express-session");
const mysql = require("mysql");
const ejs = require('ejs');
const bodyParser = require("body-parser");
var nodemailer = require('nodemailer');
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

// transporter object using SMTP transport
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'hemotracker2024@gmail.com', // Your email address
    pass: 'thuz uiso adwf jhhz' // Your email app password
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
  connection.query("INSERT INTO `donor` (`don_fname`, `don_lname`, `don_gender`, `don_age`, `don_dob`, `don_mail`, `don_blood`, `don_phno`, `don_location`, `don_state`, `don_password`, `don_pin`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [rfirstname, rlastname, rgender, rage, rdob, remail, rblood, rphno, rcity, rstate, rpassword, rpin], (error, results, fields) => {
    if (error) {
      console.error("Error inserting data into database:", error.message);
      return res.status(500).send("Error registering user.");
    }
    console.log("User registered successfully!");
    // Send a success email to the registered donor
    var mailOptions = {
      from: 'hemotracker2024@gmail.com', // Your email address
      to: req.body.email, // Donor's email address
      subject: 'Registration Successful',
      text: 'Dear Donor, \n\nWe are thrilled to inform you that your registration with Hemotracker has been successfully processed! Welcome aboard!. \n\nYour decision to join us in our mission to make a difference in healthcare is greatly appreciated. With your participation, we are one step closer to creating a robust platform that facilitates the critical process of blood donation and tracking. \n\nOnce again, thank you for choosing Hemotracker. Together, we can make a meaningful impact on the lives of patients in need of life-saving blood transfusions. \n\nWarm regards, \n\n\n\nHemotracker Team.'
    };

    // Send the email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).send("Error sending email.");
      } else {
        console.log('Email sent: ' + info.response);
        // Email sent successfully!
        // You may want to handle this success case accordingly
      }
    });
    res.redirect('/dlog?success=1'); // Redirect to login page after successful registration
  });
});
//----------------------------------------------------------------------------------------
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
      console.log("Donor details:", req.session.user); // Log donor details
      res.redirect('/home?success=2')
    } else {
      // If user does not exist or credentials are incorrect, render an error message or redirect back to login page
      console.log("Invalid email or password");
      res.redirect('/dlog?error=1');
    }
  });
});
// -------------------------------------------------------------------------------------------------------
// Route handler for the home page
app.get('/home', (req, res) => {
  // Check if user is logged in
  if (req.session.user) {
    // If logged in, retrieve user's information from session
    const user = req.session.user;

    // Check for a success message
    const successMessage2 = req.query.success === '2' ? 'Login successful!' : '';
    // Fetch donor details
    connection.query(
      'SELECT * FROM donor WHERE don_id = ?',
      [user.don_id],
      (error, donorResults, fields) => {
        if (error) {
          console.log('Error fetching donor data from the database:', error);
          res.status(500).send('Internal Server Error');
        } else {
          // Fetch request data for the logged-in donor including acceptor details and request status
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
                // Render the home page template and pass the user's information, donor details, and request data to it
                res.render('donor/home', { user, donor: donorResults[0], requests: requestResults, successMessage2 });
              }
            }
          );
        }
      }
    );
  } else {
    // If user is not logged in, redirect to login page
    res.redirect('/dlog');
  }
});

// -------------------------------------------------------------------------------------------------------
// Route to handle donor accepting the request
app.post('/approveRequest/:requestId', (req, res) => {
  const requestId = req.params.requestId;

  // Update the status of the request in the database from "pending" to "accepted"
  connection.query('UPDATE request SET status = "active" WHERE req_id = ?', [requestId], (error, results, fields) => {
    if (error) {
      console.log('Error updating request status:', error);
      return res.status(500).send('Internal Server Error');
    } else {
      // Fetch request details including donor and acceptor information
      connection.query(
        'SELECT r.req_id, r.donor_id, r.acceptor_id, r.status, d.don_fname, d.don_lname, d.don_mail, ' +
        'a.acc_fname, a.acc_lname, a.acc_mail ' +
        'FROM request r ' +
        'JOIN donor d ON r.donor_id = d.don_id ' +
        'JOIN acceptor a ON r.acceptor_id = a.acc_id ' +
        'WHERE r.req_id = ?',
        [requestId],
        (error, requestDetails, fields) => {
          if (error) {
            console.log('Error fetching request details from the database:', error);
            res.status(500).send('Internal Server Error');
          } else {
            // Construct email message
            const donorName = `${requestDetails[0].don_fname} ${requestDetails[0].don_lname}`;
            const donorEmail = requestDetails[0].don_mail;
            const acceptorName = `${requestDetails[0].acc_fname} ${requestDetails[0].acc_lname}`;
            const acceptorEmail = requestDetails[0].acc_mail;

            const mailOptionsDonor = {
              from: 'hemotracker2024@gmail.com', // Your email address
              to: donorEmail, // Donor's email address
              subject: 'Blood Request Accepted',
              text: `Dear ${donorName}, \n\nYour blood donation request has been accepted by ${acceptorName}. Thank you for your willingness to donate. Please coordinate with ${acceptorName} for further details. \n\nThank you, \n\nHemotracker Team`
            };

            const mailOptionsAcceptor = {
              from: 'hemotracker2024@gmail.com', // Your email address
              to: acceptorEmail, // Acceptor's email address
              subject: 'Blood Request Accepted',
              text: `Dear ${acceptorName}, \n\nYou have successfully accepted the blood donation request from ${donorName}. Please coordinate with ${donorName} for further details. \n\nThank you, \n\nHemotracker Team`
            };

            // Send emails to both donor and acceptor
            transporter.sendMail(mailOptionsDonor, function (errorDonor, infoDonor) {
              if (errorDonor) {
                console.error("Error sending email to donor:", errorDonor);
                return res.status(500).send("Error sending email to donor.");
              } else {
                console.log('Email sent to donor: ' + infoDonor.response);
                // Email sent successfully to donor!
              }
            });

            transporter.sendMail(mailOptionsAcceptor, function (errorAcceptor, infoAcceptor) {
              if (errorAcceptor) {
                console.error("Error sending email to acceptor:", errorAcceptor);
                return res.status(500).send("Error sending email to acceptor.");
              } else {
                console.log('Email sent to acceptor: ' + infoAcceptor.response);
                // Email sent successfully to acceptor!
              }
            });

            res.send('Request accepted successfully.');
          }
        }
      );
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
    [lfirstname, llastname, lgender, lemail, lphno, lpassword], (error, results, fields) => {
      if (error) {
        console.error("Error inserting data into database:", error.message);
        return res.status(500).send("Error registering user.");
      }

      // User registered successfully!
      console.log("User registered successfully!");

      // Send a success message to the registration page
      res.redirect('/accept/acclog?success=1'); // Add success parameter here

      // Send an email to the registered acceptor
      var mailOptions = {
        from: 'hemotracker2024@gmail.com', // Your email address
        to: req.body.email, // Acceptor's email address
        subject: 'Registration Successful',
        text: 'Dear Acceptor, \n\nWe are thrilled to inform you that your registration with Hemotracker has been successfully processed! Welcome aboard!. \n\nYour decision to join us in our mission to make a difference in healthcare is greatly appreciated. With your participation, we are one step closer to creating a robust platform that facilitates the critical process of blood donation and tracking. \n\nAs a registered acceptor, you now have access to a suite of features designed to streamline your blood management processes. Whether you are a hospital, clinic, or blood bank, Hemotracker is here to support you every step of the way. \n\n Once again, thank you for choosing Hemotracker. Together, we can make a meaningful impact on the lives of patients in need of life-saving blood transfusions. \n\n Warm regards, \n\n\n\nHemotracker Team.'
      };

      // Send the email
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.error("Error sending email:", error);
          return res.status(500).send("Error sending email.");
        } else {
          console.log('Email sent: ' + info.response);
          // Email sent successfully!
          // You may want to handle this success case accordingly
        }
      });

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
    // If user exists, store user data in session and redirect to home page
    if (results.length > 0) {
      // Save user data in session upon successful login
      req.session.user = results[0];
      console.log("User logged in successfully!");
      console.log("Acceptor details:", req.session.user); // Log acceptor details
      res.redirect('/accept/acchom');

    } else {
      // If user does not exist or credentials are incorrect, redirect back to login page with an error query parameter
      console.log("Invalid email or password");
      res.redirect('/accept/acclog?error=1');
    }
  });
});

// -------------------------------------------------------------------------------------------------------
// Route to render the page and fetch filtered donor data and locations
app.get('/accept/acchom', (req, res) => {
  // Fetch location and blood group from query parameters
  const location = req.query.location;
  const bloodGroup = req.query.bloodGroup;

  // Check for a success message
  const successMessage = req.query.success === '1' ? 'Login successful!' : '';
  // Check for a request sent message
  const requestSent = req.query.requestSent === 'true' ? true : false;

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
                res.render('acceptor/acchome', { donors: donorResults, locations: locationResults, acceptor: acceptorDetails, requests: requestResults, successMessage, requestSent });
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
  const acceptorDetails = req.session.user;

  // Log acceptor details for debugging
  console.log("Acceptor details from session:", acceptorDetails);

  // Check if acceptor details are available
  if (!acceptorDetails || !acceptorDetails.acc_id) {
    console.error("Acceptor details not found in session.");
    console.log("Session data:", req.session); // Log session data
    return res.status(500).send("Error sending request. Acceptor details not found.");
  }


  // Store the request details in the database
  connection.query("INSERT INTO `request` (`donor_id`, `acceptor_id`, `status`) VALUES (?, ?, 'pending')",
    [donorId, acceptorDetails.acc_id], (error, results, fields) => {
      if (error) {
        console.error("Error inserting request data into database:", error.message);
        return res.status(500).send("Error sending request.");
      }
      // Request sent successfully!
      console.log("Request sent successfully!");

      // Fetch donor details for sending email
      connection.query("SELECT * FROM `donor` WHERE `don_id` = ?", [donorId], (error, donorResults, fields) => {
        if (error) {
          console.error("Error fetching donor data from database:", error.message);
          return res.status(500).send("Error fetching donor data.");
        }

        // Construct email message
        const donorName = `${donorResults[0].don_fname} ${donorResults[0].don_lname}`;
        const donorEmail = donorResults[0].don_mail;
        const acceptorName = `${acceptorDetails.acc_fname} ${acceptorDetails.acc_lname}`;
        const acceptorEmail = acceptorDetails.acc_mail;

        const mailOptionsDonor = {
          from: 'hemotracker2024@gmail.com', // Your email address
          to: donorEmail, // Donor's email address
          subject: 'Blood Request Received',
          text: `Dear ${donorName}, \n\nYou have received a blood donation request from ${acceptorName}. Please log in to your account to view and respond to the request. \n\nThank you, \n\nHemotracker Team`
        };

        const mailOptionsAcceptor = {
          from: 'hemotracker2024@gmail.com', // Your email address
          to: acceptorEmail, // Acceptor's email address
          subject: 'Blood Request Sent',
          text: `Dear ${acceptorName}, \n\nYour blood donation request has been sent successfully to ${donorName}. Please wait for their response. \n\nThank you, \n\nHemotracker Team`
        };

        // Send emails to both donor and acceptor
        transporter.sendMail(mailOptionsDonor, function (errorDonor, infoDonor) {
          if (errorDonor) {
            console.error("Error sending email to donor:", errorDonor);
            return res.status(500).send("Error sending email to donor.");
          } else {
            console.log('Email sent to donor: ' + infoDonor.response);
            // Email sent successfully to donor!
          }
        });

        transporter.sendMail(mailOptionsAcceptor, function (errorAcceptor, infoAcceptor) {
          if (errorAcceptor) {
            console.error("Error sending email to acceptor:", errorAcceptor);
            return res.status(500).send("Error sending email to acceptor.");
          } else {
            console.log('Email sent to acceptor: ' + infoAcceptor.response);
            // Email sent successfully to acceptor!
          }
        });

        // Redirect back to the donor list page and indicate that the request was sent successfully
        res.redirect('/accept/acchom?requestSent=true');
      });
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