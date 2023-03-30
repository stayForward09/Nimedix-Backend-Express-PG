const express = require('express');
const jwt = require('jsonwebtoken');
const {
    getAppointmentsListByEmail, 
    createAppointments,
    updateAppointments,
    deleteAppointments
} = require('../database/appointments');
const path = require('path')
const ejs = require('ejs')
require('dotenv').config();

var router = express.Router();



const getAppointmentsListByEmailProc = async(req, res, next) => {
    const {owner_email} = req.body; 
    getAppointmentsListByEmail(owner_email)
        .then(result => {
             console.log(result);
            res.status(200).json({
                code: "appointments/get-list-success",
                message:`Appointments list got successfully!`, 
                data: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(401).json({
                code: "appointments/database_connection_error",
                message: "It couldn't get appointments list.",
            });
        });
}

const createAppointmentsProc = async(req, res, next) => {
    const { owner_email, partner_email, partner_name, type, time,duration} = req.body;
    createAppointments(owner_email, partner_email, partner_name, type, time,duration)
    .then(result => {
         console.log(result);
        res.status(200).json({
            code: "appointments/create-success",
            message:`Appointments creaetd successfully!`, 
            data: result
        });
    })
    .catch(err => {
        console.log(err);
        res.status(401).json({
            code: "appointments/database_connection_error",
            message: "It couldn't create appointments item.",
        });
    });
  }
  const updateAppointmentsProc = async(req, res, next) => {
    const {id, owner_email, partner_email, partner_name, type, time,duration} = req.body;
    updateAppointments(id, owner_email, partner_email, partner_name, type, time,duration)
    .then(result => {
         console.log(result);
        res.status(200).json({
            code: "appointments/update-success",
            message:`Appointments updated successfully!`, 
            data: result
        });
    })
    .catch(err => {
        console.log(err);
        res.status(401).json({
            code: "appointments/database_connection_error",
            message: "It couldn't update appointments item.",
        });
    });
  }
  const deleteAppointmentsProc = async(req, res, next) => {
    const id = req.body.id;
    deleteAppointments(id)
    .then(result => {
         console.log(result);
        res.status(200).json({
            code: "appointments/delete-success",
            message:`Appointments deleted successfully!`
        });
    })
    .catch(err => {
        console.log(err);
        res.status(401).json({
            code: "appointments/database_connection_error",
            message: "It couldn't delete appointments item.",
        });
    });
  }
      




router.get('/info', getAppointmentsListByEmailProc);
router.post('/info', createAppointmentsProc);
router.put('/info',updateAppointmentsProc);
router.delete('/info',deleteAppointmentsProc);

module.exports = router;
