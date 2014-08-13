'use strict';

var slug = require('slug');

module.exports = function(string, delimiter) {
    var tag,
        tags,
        returnArray;

    //if we are passing an existing array of tag objects
    if (string instanceof Array) {
        var newString = [];
        for (var i = 0; i < string.length; i++) {
            newString.push(string[i].tag);
        }

        string = newString.join(delimiter);
    }

    if (string.substr(string.length-1, string.length) === ',') {
        string = string.substr(0, string.length-1);
    }

    tags = string.split(delimiter);
    returnArray = [];
    for (var k=0; k < tags.length; k++) {
        tag = tags[k].trim();

        returnArray.push({
            tag: tag,
            slug: slug(tag)
        });
    }

    return returnArray;
};
