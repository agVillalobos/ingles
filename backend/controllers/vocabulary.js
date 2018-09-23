'use strict'

var Vocabulary = require('../models/vocabulary');
var mongoosePaginate = require('mongoose-pagination');

function getVocabularies(req, res) {
    var page = 1;
    var itemsPerPage = 5;

    if (req.params.page) {
        page = req.params.page;
    }

    var type = "";
    if (req.params.type) {
        type = req.params.type;
    }
    var finder = {};
    if (type != "")
        finder = { 'Type': type };


    Vocabulary.find(finder)
        .paginate(page, itemsPerPage, (err, vocabularies, total) => {
            if (err) return res.status(500).send({ message: 'Error en la peticion' });

            if (!vocabularies) return res.status(404).send({ message: 'There is not vocabularies.' });

            return res.status(200).send({ vocabularies, total });
        });
}

function getCounters(req, res) {
    var page = 1;
    var itemsPerPage = 5;

    var type = "";
    if (req.params.type) {
        type = req.params.type;
    }
    var finder = {};
    if (type != "")
        finder = { 'Type': type };

    Vocabulary.find(finder)
        .paginate(page, itemsPerPage, (err, vocabularies, total) => {
            if (err) return res.status(500).send({ message: 'Error en la peticion' });

            if (!vocabularies) return res.status(404).send({ message: 'There is not vocabularies.' });

            return res.status(200).send(
                {
                    total: total,
                    itemsPerPage: 5,
                    pages: Math.ceil(total / itemsPerPage)

                });
        });

}

module.exports = {
    getVocabularies,
    getCounters
};