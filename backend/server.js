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

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.json({
  limit: '200mb',
  type: ['application/json', 'text/plain']
}))

//stores the uploaded files on the server
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + file.originalname.split('.')[1]);
    });
  }
});


const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password : 'root',
    database : 'my_db' //configure stuff here!!!
  }
});

const uploader = multer({storage: storage});

app.post('/uploadFile', uploader.single('uploadedFile'), (req, res) => {

  //should do a check to see if a file like this was uploaded maybe??
  //you dont want to keep duplicated files, since the names are random anyway
  //could probably use some functionality like checksum to see if a file has same content??
  //#TODO
  let results = []
  let crimes = {}
  const filepath = req.file.path
  fs.createReadStream(filepath)
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

      if (crimes.hasOwnProperty(row['Crime type'])) {
        crimes[row['Crime type']].count += 1
      } else {
        crimes[row['Crime type']] = {
          count: 1
        }
      }
      results.push(data)
    })
    .on('end', () => {
      console.log('>> CSV file successfully processed.');
      res.json({results: results, crime: crimes, path: filepath}) //RETURN PATH TO USER
    });
})

app.post('/sendTodb', (req, res) => {
  let filepath = req.body.filepath
  console.log('>> dataset acquired.', filepath)
  let data = []
  fs.createReadStream(filepath)
    .pipe(csv())
    .on('data', (row) => {
      let record = {
        crime_id: row['Crime ID'],
        date: row.Month,
        long: row.Longitude,
        lat: row.Latitude,
        location: row.Location,
        crime: row['Crime type']
      }
      data.push(record)
    })
    .on('end', () => {
      const chunkSize = 10;
      knex.batchInsert('crime_record', data, chunkSize)
        .then(function (ids) {
          console.log('this???', ids)
          res.json({message: 'dataset uploaded.'})
        })
        .catch(function (error) {
          //catch exception...
          console.log(error)
        });
    });



})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
