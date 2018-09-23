'use strict'

var mongoose = require('mongoose');
var schema = mongoose.Schema;

var PhrasalVerbSchema = schema({
    name: String,
    synonyms: String,
    translate: String,
    examples: String,
    meanings: String

});

module.exports = mongoose.model('phrasalverbs', PhrasalVerbSchema);
