import { Component, OnInit } from '@angular/core';
// import { Router, ActivatedRoute, Params } from '@angular/router';
import { PhrasalVerb } from '../../models/phrasalverb'
import { PhrasalVerbService } from '../../services/phrasalverb.service';
import { GLOBAL } from '../../services/global';
declare var $: any;

@Component({
    selector: 'phrasalverbs',
    templateUrl: './phrasalverbs.component.html',
    providers: [PhrasalVerbService]
})
export class PhrasalVerbComponent implements OnInit {
    public title: string;
    public url: string;
    public phrasalVerbs: PhrasalVerb[];

    constructor(
        // private _route: ActivatedRoute,
        // private _router: Router,
        private _phrasalverbService: PhrasalVerbService
    ) {
        this.title = 'Phrasalverb';
        this.url = GLOBAL.url;
    }

    ngOnInit() {
        console.log(this.phrasalVerbs);
        console.log('phrasalverb.component ha sido cargado');
        this.getPhrasalVerbs();

        $(function () {
            $('[data-toggle="popover"]').popover()
          })
    }

    getPhrasalVerbs(){
        this._phrasalverbService.getCounters().subscribe(
            response => {
                //  console.log(response); 
                 let random = this.randomInt(1, response.pages);
                 console.log(random);
                 this._phrasalverbService.getPhrasalVerbs(random).subscribe(
                    response => {
                         //console.log(response); 
                         this.phrasalVerbs = response.phrasalVerbs;
                        //  console.log(this.phrasalVerbs);
                         
                        },
                    error => { }
                );
                },
            error => { }
        );

        
    }

    randomInt(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
     }

     updatePhraslVerbs(){
        this.getPhrasalVerbs();
     }


}