const express = require('express');
const jwt = require('jsonwebtoken');
const {
    getServiceInfoList, 
    createServiceInfo,
    updateServiceInfo,
    deleteServiceInfo
} = require('../database/services');
const path = require('path')
const ejs = require('ejs')
require('dotenv').config();

var router = express.Router();



const getServiceInfoListProc = async(req, res, next) => {
    getServiceInfoList()
        .then(result => {
             console.log(result);
            res.status(200).json({
                code: "service/get-list-success",
                message:`Sevice list got successfully!`, 
                data: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(401).json({
                code: "service/database_connection_error",
                message: "It couldn't get service list.",
            });
        });
}

const createSeviceInfoProc = async(req, res, next) => {
    const {service_name, service_detail, service_img} = req.body;
    createServiceInfo(service_name, service_detail, service_img)
    .then(result => {
         console.log(result);
        res.status(200).json({
            code: "service/create-success",
            message:`Sevice creaetd successfully!`, 
            data: result
        });
    })
    .catch(err => {
        console.log(err);
        res.status(401).json({
            code: "service/database_connection_error",
            message: "It couldn't create service item.",
        });
    });
  }
  const updateServiceInfoProc = async(req, res, next) => {
    const {service_id, service_name, service_detail, service_img} = req.body;
    updateServiceInfo(service_id,service_name, service_detail, service_img)
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
  const deleteServiceInfoProc = async(req, res, next) => {
    const id = req.body.id;
    deleteServiceInfo(id)
    .then(result => {
         console.log(result);
        res.status(200).json({
            code: "service/delete-success",
            message:`Sevice deleted successfully!`
        });
    })
    .catch(err => {
        console.log(err);
        res.status(401).json({
            code: "service/database_connection_error",
            message: "It couldn't delete service item.",
        });
    });
  }
      




router.get('/info', getServiceInfoListProc);
router.post('/info', createSeviceInfoProc);
router.put('/info',updateServiceInfoProc);
router.delete('/info',deleteServiceInfoProc);
module.exports = router;
