import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {HttpClientModule} from '@angular/common/http'
//Componentes
import { AppComponent } from './app.component';
import { PhrasalVerbComponent } from './components/phrasalverbs/phrasalverbs.component';
import { VocabularyComponent } from './components/vocabulary/vocabulary.component';


@NgModule({
  declarations: [
    AppComponent, 
    PhrasalVerbComponent,
    VocabularyComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
