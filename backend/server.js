const express = require('express')
const path = require('path')
const fs = require('fs')
const crypto = require('crypto')
const mime = require('mime')
const app = express()
const port = 3000
const multer  = require('multer')
const csv = require('csv-parser');

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
var uploader = multer({ storage: storage });


app.get('/', (req, res) => {
	res.json({message:'yo skrzek'})
})

app.post('/uploadFile', uploader.single('uploadedFile'), (req, res) => {
  let results = []
  fs.createReadStream(req.file.originalname)
    .pipe(csv())
    .on('data', (row) => {
      console.log(row.Longitude, 'long');
      console.log(row.Latitude, 'lat');

      let data = {
        long:row.Longitude,
        lat:row.Latitude,
        crime:row['Crime type']
      }

      results.push(data)
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
      res.json({results:results})
    });
})


//server logic here

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
