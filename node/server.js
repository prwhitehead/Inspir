'use strict';

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
var easyimg = require('easyimage');
var processImages = require('./helpers/processImages.js');
var processTags = require('./helpers/processTags.js');

mongoose.connect('mongodb://localhost/simple');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB Connection Error'));
db.once('open', function(){
    // console.log('DB connection open for business');
});

function throwError(message, response, error) {
    response.end(JSON.stringify({
        status: 500,
        error: message + ' ' + error
    }));
}

var siteSchema = mongoose.Schema({
    url: String,
    desc: String,
    orig: String,
    sm: String,
    md: String,
    lg: String,
    tags: Array
});

var Site = mongoose.model('Site', siteSchema);

var app = express();
app.use(cors());
app.use(bodyParser.json());

var webShotOptions = {
    shotSize: {
        height: 'all',
        width: 'all'
    },
    userAgent: 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36',
    javascriptEnabled: true,
};

app.get('/sites', function(req, res){
    Site.find(function(err, doc){
        res.send(doc);
    });
});

app.get('/site/:id', function(req, res){
    Site.find({
        _id: req.params.id
    }, function(err, site){
        return res.send(site[0]);
    });
});

app.post('/site/:id', function(req, res){
    var query = {
        _id: req.params.id
    };

    var newData = {
        desc: req.body.desc,
        tags: processTags(req.body.tags, ',')
    };

    Site.findOneAndUpdate(query, newData, {upsert: true}, function(err, site){
        if (err) {
            throwError('Couldnt update the document');
        }

        res.end(JSON.stringify({
            status: 200,
            data: site,
            success: 'Document updated'
        }));
    });
});

app.put('/site', function(req, res){

    if (req.body.length === 0) {
        throwError('No site data found', res);
    }

    var dir = 'app/images/screenshots/';
    var filename = slug(req.body.url);
    var ext = '.png';
    var targetImagePath = dir + filename + ext;
    var targetUrl = req.body.url;

    if (fs.existsSync(dir)) {

        webshot(targetUrl, targetImagePath, webShotOptions, function(err) {
            if (err) {
                throwError('Couldnt save the file', res, err);
            }

            easyimg
                .info(targetImagePath)
                .then(
                    function(image) {
                        processImages(targetImagePath, image, function(response){

                            var newSite = new Site({
                                url: req.body.url,
                                desc: req.body.desc,
                                orig: filename + ext,
                                sm: response[0],
                                md: response[1],
                                lg: response[2],
                                tags: processTags(req.body.tags, ',')
                            });

                            newSite.save(function(err){

                                if (err) {
                                    throwError('Couldnt save the item');
                                }

                                res.end(JSON.stringify({
                                    status: 200,
                                    data: newSite,
                                    success: 'New site saved'
                                }));
                            });
                        });

                    }, function(err) {
                        throwError('Couldnt resize image', res, err);
                    }
                );
        });

    } else {
        throwError('Make the directory dumbass', res);
    }
});

app.listen(3000);
console.log('listening on port 3000');
