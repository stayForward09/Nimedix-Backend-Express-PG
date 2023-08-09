const express = require('express');
const {addEmail} = require('../database/waitlist');
const router = express.Router();


const addEmailToWaitList = (req, res, next) => {
  const {email} = req.body;
  addEmail(email)
    .then(result => {
      if (result.success) {
        res.status(200).json({
          code: "waitlist/add-success",
          message: "Email added successfully."
        })
      } else {
        res.status(200).json({
          code: "waitlist/add-failure",
          message: "Email already added."
        })
      }
    })
  
}

router.post('/', addEmailToWaitList)

module.exports = router;