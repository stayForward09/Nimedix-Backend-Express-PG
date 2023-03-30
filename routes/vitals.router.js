const express = require('express');
const jwt = require('jsonwebtoken');
const {
    getVitalsByEmail, 
    createVitalsByEmail,
    updateVitalsByEmail,
    updateTakeMedichineStatusByEmail
} = require('../database/vitals');
require('dotenv').config();

var router = express.Router();



const getVitalsByEmailProc = async(req, res, next) => {
    const email= req.query.email;
    getVitalsByEmail(email)
        .then(result => {
             console.log(result);
            res.status(200).json({
                code: "vitals/get-success",
                message:`Vitals list got successfully!`, 
                data: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(401).json({
                code: "vitals/database_connection_error",
                message: "It couldn't get vitals list.",
            });
        });
}



const updateTakeMedicineStatusByEmailProc = async(req, res, next) => {
    const {email, takeMedicine,status} = req.body;

    updateTakeMedichineStatusByEmail(email, takeMedicine,status)
        .then(result => {
             console.log(result);
            res.status(200).json({
                code: "take-madicine/update-success",
                message:`Take-madicine status updated successfully!`, 
                data: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(401).json({
                code: "service/database_connection_error",
                message: "It couldn't update take-madicine status.",
            });
        });
}

const createVitalsByEmailProc = async(req, res, next) => {
    const {email, heartRate, O2Saturation, respirationRate, bodyTemp, bloodSugar} = req.body;
    createVitalsByEmail(email, heartRate, O2Saturation, respirationRate, bodyTemp, bloodSugar)
    .then(result => {
         console.log(result);
        res.status(200).json({
            code: "vitals/create-success",
            message:`Vitals creaetd successfully!`, 
            data: result
        });
    })
    .catch(err => {
        console.log(err);
        res.status(401).json({
            code: "vitals/database_connection_error",
            message: "It couldn't create vitals item.",
        });
    });
  }
const updateVitalsByEmailProc = async(req, res, next) => {
    const {email, heartRate, O2Saturation, respirationRate, bodyTemp, bloodSugar} = req.body;
    updateVitalsByEmail(email, heartRate, O2Saturation, respirationRate, bodyTemp, bloodSugar)
    .then(result => {
         console.log(result);
        res.status(200).json({
            code: "service/update-success",
            message:`Sevice updated successfully!`, 
            data: result
        });
    })
    .catch(err => {
        console.log(err);
        res.status(401).json({
            code: "service/database_connection_error",
            message: "It couldn't update service item.",
        });
    });
  }





router.get('/v', getVitalsByEmailProc);
router.post('/v', createVitalsByEmailProc);
router.put('/v',updateVitalsByEmailProc);
router.put('/t', updateTakeMedicineStatusByEmailProc);
module.exports = router;
