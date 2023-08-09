const express = require('express');
const jwt = require('jsonwebtoken');
const {
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  email_otp,
  resetPassword,
  verify_email_otp
} = require('../database/users');
const crypt = require('../core/encryption');
const path = require('path')
const ejs = require('ejs')
const sendgrid = require('@sendgrid/mail')
require('dotenv').config();
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN, {
  lazyLoading: true
});
var router = express.Router();
const loginUserProc = (req, res, next) => {
  const {email, password} = req.query;

  signInWithEmailAndPassword(email, password)
    .then (rows => {
      if (rows.length == 1) {
        var user = rows[0];

        const payload = {
          id: user.user_id,
          name: user.name,
        };

        // Sign token
        jwt.sign(
          payload,
          process.env.TOKEN_SECRET_KEY,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            if (err) {
              console.log(err);
            } else {
              user.accessToken = 'Bearer ' + token;

              res.status(200).json({code:"auth/success", data: user, message: "Success!"});
            }
          }
        );
      } else {
        res.status(200).json({
          code: "auth/wrong-password",
          message: "The password is invalid or the user does not have a password.",
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(200).json({
        code: "auth/login-error",
        message: "It couldn't login user with this credential.",
      });
    });
}

const registerUserProc = (req, res, next) => {
  const { email, full_name, phone_number, address, dob, photo, password, username, user_role} = req.body;

  createUserWithEmailAndPassword(email, full_name, phone_number, address, dob, photo, password, username, user_role)
    .then(result => {
      if (result.success == true) {
        res.status(200).json({
          code: "auth/signup-success",
          message: "The same email exists.",
        });
      } else {
        res.status(200).json({
          code: "auth/duplicated-email",
          message: "The same email exists.",
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(200).json({
        code: "auth/create-user-error",
        message: "It couldn't create new user.",
      });
    });
};


const resetPasswordProc = (req, res, next) => {
  const {email, phone_numbner, newPassword} = req.body;
  const method = email?"email": "phone_number";
  const value = email?email:phone_numbner;
  console.log(method, value)
  // const email = crypt.decrypt('resetPasswordCode');
  try {
    resetPassword(value, newPassword, method)
      .then(user => {
        if (user) {
          res.status(200).json(null);
        } else {
          res.status(200).json({
            code: "auth/wrong-token",
            message: "There is wrong token.",
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(401).json({
          code: "auth/reset-password-query-error",
          message: "It couldn't reset the password."
        })
      });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      code: "auth/reset-password-code-error",
      message: "Wrong reset password code!"
    });
  }
  
}

const sendTwilioOTP = async(req, res, next) => {
  const {countryCode, phoneNumber } = req.body;
  try{
    const otpResponse = await client.verify.v2.services(process.env.TWILIO_SERVICE_SID)
                              .verifications.create({
                                friendlyName: 'Nimedix',
                                to:`+${countryCode}${phoneNumber}`,
                                channel: "sms",
                              })
    res.status(200).send(`OTP sent successfully!: ${JSON.stringify({url: otpResponse.url, valid: true, status: otpResponse.status})}`);
    res.status(200).json({
      code: "otp/sms-otp-success",
      message: 'OTP sent successfully!',
      data:{url: otpResponse.url, valid: true, status: otpResponse.status}
    });
  }catch(error) {
    res.status(401).json({
      code: "otp/sms-otp-error",
      message: error?.message || 'Something went wrong!',
    });
  }
}

const verifyTwilioOTP = async(req, res, next) => {
  const {countryCode, phoneNumber, otp} = req.body;
  try{
    const verifiedResponse = await client.verify.v2.services(process.env.TWILIO_SERVICE_SID)
          .verificationChecks.create({
              to: `+${countryCode}${phoneNumber}`,
              code: otp,
    })
    res.status(200).json({
      code: "otp/sms-otp-verification-success",
      message: 'OTP verified successfully!',
      data:{valid:verifiedResponse.valid, status: verifiedResponse.status}
    });
  } catch(error) {
    res.status(401).json({
      code: "otp/sms-otp-verification-error",
      message: error?.message || 'Something went wrong!',
    });
  }
}

const sendEmailOTP = async(req, res, next) => {
  const {email } = req.body;
  try {
    sendgrid.setApiKey(process.env.SEND_GRID_API_KEY);
    const code = rand(100000, 999999);
    const from = "nimedix@nimedix.care";
    const html = await ejs.renderFile(path.join(__dirname, `../mail-template/emailOPT.ejs`), {code:code});
      let msgs = {from: from, to: email, subject: "Welcom to Nimedix", html};
      const msg = { ...msgs, text: 'Nimedix'};
    
      try {
          email_otp(email, code, 'pending')
            .then(result => {
              console.log(result);
            })
            .catch(err => {
              console.log(err);
              res.status(401).json({
                code: "otp/database_connection_error",
                message: "It couldn't update your verification code.",
              });
            });
            await sendgrid.send(msg);
            res.status(200).json({
              code: "otp/email-otp-success",
              message:`Email OTP sent successfully!`
            });
      } catch (error) {
          console.log(error);
          res.status(401).json({
            code: "otp/email-otp-error",
            message: "It couldn't send OTP.",
          });
      }
  
    
  } catch (error) {
    console.log('Error during sending invitation');
    console.log(error);
    res.status(401).json({
      code: "otp/email-otp-error",
      message: "It couldn't send OTP.",
    });
  }

}

const verifyEmailOTP = async(req, res, next) => {
  const {email, code} = req.body;
  console.log(email, code);
  try{
    verify_email_otp(email, code)
      .then(result => {
        console.log(result);
        res.status(200).json(result)
      })
      .catch(err =>{
        res.status(400).json({
          code: "otp/database_connection_error",
          message: "It couldn't find matched data."
        })
      })
  } catch(error) {
    res.status(error?.status || 400).send(error?.message || 'Something went wrong!');
  }
}
const  rand = function(low, high) {
  return Math.floor(Math.random() * (high - low) + low);
};


router.get('/login', loginUserProc);
router.post('/signup', registerUserProc);
router.post('/reset',resetPasswordProc )
router.post('/send-sms-otp',sendTwilioOTP);
router.post('/verify-sms-otp',verifyTwilioOTP);
router.post('/send-email-otp',sendEmailOTP);
router.post('/verify-email-otp',verifyEmailOTP);
module.exports = router;
