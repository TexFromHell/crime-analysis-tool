const express = require('express')
const path = require('path')
const fs = require('fs')
const crypto = require('crypto')
const mime = require('mime')
const app = express()
const port = 3000
const multer = require('multer')
const csv = require('csv-parser');
var bodyParser = require('body-parser');

app.use(require("body-parser").json())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json({
  limit: '200mb',
  type: ['application/json', 'text/plain']
}))

//stores the uploaded files on the server
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            cb(null, raw.toString('hex') + Date.now() + '.' + file.originalname.split('.')[1]);
        });
    }
});

var uploader = multer({storage: storage});

let results = []
let crimes = {}

app.post('/uploadFile', uploader.single('uploadedFile'), (req, res) => {

    fs.createReadStream(req.file.originalname)
        .pipe(csv())
        .on('data', (row) => {
            // console.log(row.Longitude, 'long');
            // console.log(row.Latitude, 'lat');
            // console.log(row['Crime type'], 'crime')

            let data = {
                Id: row['Crime ID'],
                date: row.Month,
                long: row.Longitude,
                lat: row.Latitude,
                location: row.Location,
                crime: row['Crime type']
            }

            if (crimes.hasOwnProperty(row['Crime type']))  {
              crimes[row['Crime type']].count += 1
            } else {
              crimes[row['Crime type']] = {
                count:1
              }
            }

            results.push(data)

        })
        .on('end', () => {
            console.log('>> CSV file successfully processed.');
            res.json({results: results, crime: crimes})
        });
})

app.post('/send', (req, res) => {
    let dataset = JSON.stringify(req.body)
    console.log('>> dataset acquired.')
    res.json({message: 'dataset uploaded.'})
})
















app.listen(port, () => console.log(`Example app listening on port ${port}!`))
