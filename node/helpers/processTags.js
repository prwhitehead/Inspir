'use strict';

var slug = require('slug');

module.exports = function(string, delimiter) {
    var tag,
        tags,
        returnArray;

    if (string.substr(string.length-1, string.length) === ',') {
        string = string.substr(0, string.length-1);
    }

    tags = string.split(delimiter);
    returnArray = [];
    for (var i=0; i < tags.length; i++) {
        tag = tags[i].trim();

        returnArray.push({
            tag: tag,
            slug: slug(tag)
        });
    }

    return returnArray;
};
