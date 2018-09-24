import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Vocabulary } from '../../models/vocabulary';
import { VocabularyService } from '../../services/vocabulary.service';

@Component({
    selector: 'add-vocabulary',
    templateUrl: './add-vocabulary.component.html',
    providers: [VocabularyService]
})

export class AddVocabularyComponent implements OnInit {
    public title: string;
    public vocabulary: Vocabulary;
    public status: string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _vocabularyService: VocabularyService
    ) {
        this.title = "Add vocabulary";
        this.vocabulary = new Vocabulary("", "", "", "", "", "", "");
    }

    ngOnInit() {
        console.log("componente de add vocabulary cargado");
    }

    onSubmit(form) {
        this._vocabularyService.addVocabulary(this.vocabulary).subscribe(
            response => {
                console.log(response);
                if (response && response.vocabulary) {
                    this.status = 'success';
                    //form.reset();
                    this._router.navigate(['/vocabulary']);
                } else {
                    this.status = 'error';
                }
            },
            error => {
                console.log(<any>error);
            }
        );

    }

}