"use strict";

//db simple
//collection sites
//db.sites.find()
//db.sites.findOne()
//db.sites.drop()

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var webshot = require('webshot');
var slug = require('slug');
var fs = require('fs');

mongoose.connect('mongodb://localhost/simple');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB Connection Error'));
db.once('open', function(){
    console.log('DB connection open for business');
});

var siteSchema = mongoose.Schema({
    url: String,
    desc: String,
    src: String
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

    var dir = './app/images/screenshots';
    var filename = slug(req.body.url) + '.png';
    var src = dir + '/' + filename;

    if (fs.existsSync(dir)) {
        var options = {
            shotSize: {
                height: 'all',
                width: 'all'
            }
        };
        webshot(req.body.url, src, options, function(err){
            if (err) {
                console.log(err);

                res.end(JSON.stringify({
                    status: 500,
                    error: 'Couldnt save the file ' + err
                }));
            }
            var data = {
                url: req.body.url,
                desc: req.body.desc,
                src: filename
            };
            var site = new Site(data);

            site.save(function(err, site){

                if (err) {
                    res.end(JSON.stringify({
                        status: 500,
                        error: 'Couldnt save the item'
                    }));
                }

                res.end(JSON.stringify({
                    status: 200,
                    data: data,
                    success: 'New site saved'
                }));
            });
        });

    } else {
        console.log('Make the directory dumbass');
    }
});

app.listen(3000);
console.log("listening on port 3000");

