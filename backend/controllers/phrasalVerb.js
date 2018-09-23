'use strict'

var PhrasalVerb = require('../models/phrasalVerb');
var mongoosePaginate = require('mongoose-pagination');

function home(req, res) {
    res.status(200).send({
        message: "hola mundo"
    });
}

function getPhrasalVerbs(req, res) {
    var page = 1;
    var itemsPerPage = 5;

    if (req.params.page) {
        page = req.params.page;
    }

    PhrasalVerb.find()
        .paginate(page, itemsPerPage, (err, phrasalVerbs, total) => {
            if (err) return res.status(500).send({ message: 'Error en la peticion' });

            if (!phrasalVerbs) return res.status(404).send({ message: 'No hay phrasl verbs' });

            return res.status(200).send({ phrasalVerbs, total });
        });
}

function getCounters(req, res) {
    var page = 1;
    var itemsPerPage = 5;

    PhrasalVerb.find()
        .paginate(page, itemsPerPage, (err, phrasalVerbs, total) => {
            if (err) return res.status(500).send({ message: 'Error en la peticion' });

            if (!phrasalVerbs) return res.status(404).send({ message: 'No hay phrasl verbs' });

            return res.status(200).send(
                {
                    total: total,
                    itemsPerPage: 5,
                    pages: Math.ceil(total/itemsPerPage)

                });
        });

}

module.exports = {
    home,
    getPhrasalVerbs,
    getCounters
};