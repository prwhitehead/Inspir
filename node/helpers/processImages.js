'use strict';

var easyimg = require('easyimage');

function removeExtension(filename) {
    var ext = filename.substr(-(filename.length - filename.lastIndexOf('.')));

    return {
        filename: filename.replace(ext, ''),
        extension: ext
    };
}

module.exports = function (src, imageData, callback) {
    var dir = '';
    var file = removeExtension(imageData.name);
    var cropResult = [];
    var thumb;
    var thumbSizes = [
        { title: 'large', w: 500 },
        { title: 'medium', w: 250 },
        { title: 'small', w: 150 }
    ];

    for (var i=0; i<thumbSizes.length; i++) {
        thumb = thumbSizes[i];
        dir = src.replace(file.filename + file.extension, '');

        var newFileName = file.filename + '-' + thumb.title + file.extension;
        easyimg
            .rescrop({
                src: src,
                dst: dir + newFileName,
                width: thumb.w,
                height: parseInt(imageData.height * (thumb.w / imageData.width))
            })
            .then(
                function(image){
                    cropResult.push(image.name);
                    if (cropResult.length === thumbSizes.length) {
                        return callback(cropResult);
                    }
                },
                function(err){
                    return err;
                }
            );
    }
};
