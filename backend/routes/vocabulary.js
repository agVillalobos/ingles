'use strict'

var express = require('express');
var VocabularyController = require('../controllers/vocabulary');
var api = express.Router();

api.get('/get-vocabularies/:page?/:type?', VocabularyController.getVocabularies);
api.get('/get-vocabularies-counters/:type?', VocabularyController.getCounters);
api.post('/save-vocabulary', VocabularyController.saveVocabulary);
api.put('/update-vocabulary/:id?', VocabularyController.updateVocabulary);

module.exports = api;