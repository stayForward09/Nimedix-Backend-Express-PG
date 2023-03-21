const express = require('express');
const jwt = require('jsonwebtoken');

const { verify } = require('../core/verify-token');

const authRouter = require('./auth.router');
const waitlistRouter = require('./waitlist.router');

require('dotenv').config();

const router = express.Router();

// Token verfication middleware
router.use((req, res, next) => {
  const token = verify(req);
  if (token) {
    req.jwtUser = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
  }
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/auth', authRouter);
router.use('/waitlist', waitlistRouter);

module.exports = router;
