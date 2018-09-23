'use strict'

var mongoose = require('mongoose');
var schema = mongoose.Schema;

var VocabularySchema = schema({
    name: String,
    synonyms: String,
    translate: String,
    examples: String,
    meanings: String,
    type: String

});

module.exports = mongoose.model('vocabularies', VocabularySchema);
