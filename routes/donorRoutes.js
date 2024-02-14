  const express = require('express');
const router = express.Router();

// User Routes
router.get('/', (req, res) => {
  res.render('index');
});

router.get('/home', (req, res) => {
  res.render('donor/home');
  });

router.get('/about', (req, res) => {
  res.render('donor/about');
});
router.get('/contact', (req, res) => {
  res.render('donor/contact');
});

router.get('/dlog', (req, res) => {
  res.render('donor/login');
});

router.get('/dreg', (req, res) => {
    res.render('donor/register');
  });

module.exports = router;