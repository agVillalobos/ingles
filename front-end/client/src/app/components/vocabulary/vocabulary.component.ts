import { Component, OnInit } from '@angular/core';
// import { Router, ActivatedRoute, Params } from '@angular/router';
import { Vocabulary } from '../../models/vocabulary'
import { GLOBAL } from '../../services/global';
import { VocabularyService } from '../../services/vocabulary.service';
declare var $: any;

@Component({
    selector: 'vocabulary',
    templateUrl: './vocabulary.component.html',
    providers: [VocabularyService]
})
export class VocabularyComponent implements OnInit {
    public title: string;
    public url: string;
    public vocabularies: Vocabulary[];
    public type: string;

    constructor(
        // private _route: ActivatedRoute,
        // private _router: Router,
        private _vocabularyService: VocabularyService
    ) {
        this.title = 'Vocabularies';
        this.url = GLOBAL.url;
        this.type = "";
    }

    ngOnInit() {
        console.log('vocabularies.component ha sido cargado');
        this.getVocabularies();

        $(function () {
            $('[data-toggle="popover"]').popover()
        })
    }

    getVocabularies(type = "") {
        this._vocabularyService.getCounters(type).subscribe(
            response => {
                let random = this.randomInt(1, response.pages);
                this._vocabularyService.getVocabularies(random, type).subscribe(
                    response => {
                        this.vocabularies = response.vocabularies;
                    },
                    error => { }
                );
            },
            error => { }
        );


    }

    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    updateVocabularies(type = "") {
        this.type = type;
        this.getVocabularies(type);
    }


}