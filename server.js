'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var cors = require('cors');
const bodyParser = require('body-parser');

const validateURL = require('./middlewares/validateURL');


var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
mongoose.connect(process.env.MONGOLAB_URI);

const Url = require('./models/Url');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

  
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.post('/api/shorturl/new', validateURL, (req, res) => {
  const originalUrl = req.body.url;
  Url.findOne({ originalUrl }, (err, result) => {
    if (err) return console.error(err);
    if (result) {
      res.json({ 
        original_url: originalUrl,
        short_url: result.shortCode
      });
    } else {
      let url = new Url({originalUrl: originalUrl});
      url.save((err, data) => {
        if (err) return console.error(err);
        res.json({ 
          original_url: data.originalUrl,
          short_url: data.shortCode
        });
      });
    }
  });
  
});


app.listen(port, function () {
  console.log('Node.js listening ...');
});