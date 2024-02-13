const express = require('express');
const router = express.Router();

// Admin Routes
router.get('/acclog', (req, res) => {
  res.render('acceptor/acclogin');
  });

router.get('/accreg', (req, res) => {
  res.render('acceptor/accregister');
});

// router.get('/acchom', (req, res) => {
//   res.render('acceptor/acchome');
// });

router.get('/accabt', (req, res) => {
  res.render('acceptor/accabout');
});

module.exports = router;
