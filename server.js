"use strict";

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');

mongoose.connect('mongodb://localhost/simple');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB Connection Error'));
db.once('open', function(){
    console.log('DB connection open for business');
});

var siteSchema = mongoose.Schema({
    url: String,
    description: String
});

var Site = mongoose.model('Site', siteSchema);

var app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/sites', function(req, res){
    Site.find(function(err, doc){
        res.send(doc);
    });
});

app.post('/site', function(req, res){

    if (req.body.length === 0) {
        res.end(JSON.stringify({
            status: 400,
            error: 'No site data found'
        }));
    }

    var site = new Site({
        url: req.body.url,
        description: req.body.description
    });

    site.save(function(err, site){
        console.log(site);

        if (err) {
            res.end(JSON.stringify({
                status: 500,
                error: 'Couldnt save the item'
            }));
        }

        res.end(JSON.stringify({
            status: 200,
            success: 'New site saved'
        }));
    });
});

app.listen(3000);
console.log("listening on port 3000");
