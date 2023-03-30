const express = require('express')
const AWS = require('aws-sdk')
const fs = require('fs')
const FileType = require('file-type')
const multiparty = require('multiparty')
const {
    createAssets,
    getAssetsById,
    deleteAssetsById
  } = require('../database/assets');
const router = express.Router()

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

// create S3 instance
const s3 = new AWS.S3()

const uploadFile = (buffer, name, type) => {
    const params = {
        ACL: 'public-read',
        Body: buffer,
        Bucket: process.env.AWS_S3_BUCKET,
        ContentType: type.mime,
        Key: `${name}.${type.ext}`,
    }
    
    return s3.upload(params).promise()
}

// Define POST route
router.post('/upload', (req, res) => {
    const form = new multiparty.Form()
    form.parse(req, async (error, fields, files) => {
        if (error) {
            return res.status(500).send(error)
        }
        try {
            const folder = fields.folder[0] ? fields.folder[0] : 'files'
            const path = files.file[0].path
            const buffer = fs.readFileSync(path)
            let type = await FileType.fromBuffer(buffer)
            type = (typeof type === 'undefined' ? {ext: "undefined", mime: "undefined"} : type)
            const fileName = `${folder}/${Date.now().toString()}`
            const data = await uploadFile(buffer, fileName, type)
            const {service_name, service_detail, service_img} = req.body;
            createAssets(files.file[0].originalFilename, data.Key, type.mime,files.file[0].size,Date.now())
            .then(result => {
                 console.log(result);
                res.status(200).json({
                    code: "assets/upload-success",
                    message:`File uploaded successfully!`, 
                    data: result
                });
            })
            .catch(err => {
                console.log(err);
                res.status(401).json({
                    code: "assets/file-upload-error",
                    message: "It couldn't upload the file.",
                });
            });

           
        } catch (err) {
            console.log(err)
            return res.status(500).send(err)
        }
    })
})

router.get('/download', (req, res) => {
    const id = req.query.id

    getAssetsById(id)
    .then(result => {
        if (!result) {
            console.log("not found")
            return res
                .status(404)
                .json({ filenotfound: 'File not found' })
        }
        const params = {
            Bucket: "chat-app-assets",
            Key: result.key
        }
        return s3.getObject(params, async (err, data) => {
            const filePath = "upload/" + result.name
            // const filePath = asset.name
            
            if (err) console.error(err)
            fs.writeFileSync(filePath, data.Body)
        
            //download
            res.setHeader('Content-disposition', 'attachment; filename='+result.name)
            res.setHeader('Content-Type', data.ContentType)
            res.download(filePath, function (err) {
                if (err) {
                    // Handle error, but keep in mind the response may be partially-sent
                    // so check res.headersSent
                    console.log(res.headersSent)
                } else {
                // decrement a download credit, etc. // here remove temp file
                    fs.unlink(filePath, function (err) {
                        if (err) {
                            console.error(err)
                        }
                        console.log('Temp File Delete')
                    })
                }
            })

            console.log(`${filePath} has been created!`)
        })
    })
    .catch(err => {
        console.log(err);
        res.status(401).json({
            code: "assets/file-download-error",
            message: "It couldn't download the file.",
        });
    });
  
})
router.delete('/file', (req, res) => {
    const id = req.query.id

    deleteAssetsById(id)
    .then(result => {
        if (!result) {
            console.log("not found")
            return res
                .status(404)
                .json({ filenotfound: 'File not found' })
        }
        res.status(401).json({
            code: "assets/file-delete-success",
            message: "The file deleted successfully.",
        });
    })
    .catch(err => {
        console.log(err);
        res.status(401).json({
            code: "assets/file-delete-error",
            message: "It couldn't delete the file.",
        });
    });
  
})
module.exports = router;