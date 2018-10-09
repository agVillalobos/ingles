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
        finder = { 'type': type };


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
        finder = { 'type': type };

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

function saveVocabulary(req, res) {
    var params = req.body;
    var vocabulary = new Vocabulary();

    console.log(params);

    if (params.name && params.synonyms && params.translate
        && params.examples && params.meanings && params.type) {
        vocabulary.name = params.name;
        vocabulary.synonyms = params.synonyms;
        vocabulary.translateF = params.translate;
        vocabulary.examples = params.examples;
        vocabulary.meanings = params.meanings;
        vocabulary.type = params.type;

        //Controlar vocabularios duplicados.
        Vocabulary.find({
            $or: [
                { name: vocabulary.name.toLowerCase() },
                { examples: vocabulary.examples.toLowerCase() }
            ]
        }
        ).exec((err, vocabularies) => {
            if (err) {
                return res.status(500).send({ message: 'error al guardar al vocabulary' });
            }
            if (vocabularies && vocabularies.length >= 1) {
                return res.status(200).send({ message: 'El vocabulario ya existe.' });
            } else {
                vocabulary.save((err, vocabularyStored) => {
                    if (err) return res.status(500).send({ message: 'error al guardar al vocabulario' });

                    if (vocabularyStored) {
                        res.status(200).send({ vocabulary: vocabularyStored });
                    }
                    else {
                        res.status(400).send({ message: 'No se ha registrado el vocabulario.' });
                    }
                });
            }
        });
    }
    else {
        res.status(200).send({
            message: 'Envia todos los campos necesarios'
        });
    }
}

//Edicion de datos de vocabulario
function updateVocabulary(req, res) {
    var vocabularyId = req.params.id;
    var update = req.body;
    console.log(update);
    console.log(vocabularyId);
    if(!vocabularyId){
        return res.status(500).send({ message: 'No hay id del voabulary.' });
    }

    Vocabulary.findByIdAndUpdate(vocabularyId, update, { new: true }, (err, vocabularyUpdated) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' });

        if (!vocabularyUpdated) return res.status(404).send({ message: 'No se ha podido actualizar el vocabulary.' });

        return res.status(200).send({ vocabulary: vocabularyUpdated });

    });




}

module.exports = {
    getVocabularies,
    getCounters,
    saveVocabulary,
    updateVocabulary
};