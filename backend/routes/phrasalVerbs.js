'use strict'

var express = require('express');
var PhrasalVerbController = require('../controllers/phrasalVerb');
var api = express.Router();

api.get('/home', PhrasalVerbController.home);
api.get('/get-phrasal-verbs/:page?', PhrasalVerbController.getPhrasalVerbs);
api.get('/get-phrasal-verbs-counters', PhrasalVerbController.getCounters);

module.exports = api;