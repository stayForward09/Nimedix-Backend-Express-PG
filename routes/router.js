const express = require('express');
const jwt = require('jsonwebtoken');

const { verify } = require('../core/verify-token');

const authRouter = require('./auth.router');
const waitlistRouter = require('./waitlist.router');


const appointmentsRouter = require('./appointments.router');

const vitalsRouter = require('./vitals.router');

//const messagesRouter = require('/messages.router');

const servicesRouter = require('./services.router');
const filesRouter = require('./files.router')

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

router.use('/services', servicesRouter);
router.use('/appointment', appointmentsRouter);
router.use('/vitals', vitalsRouter);
router.use('/files', filesRouter);


module.exports = router;
