const express = require('express');
const router = express.Router();

// Admin Routes
router.get('/adlog', (req, res) => {
  res.render('admin/admin-login');
  });
  
router.get('/addash', (req, res) => {
  res.render('admin/admin-dashboard');
});

// router.get('/addonor', (req, res) => {
//   res.render('admin/admin-donor');
// });
// router.get('/adaccept', (req, res) => {
//     res.render('admin/admin-acceptor');
//   });

module.exports = router;
