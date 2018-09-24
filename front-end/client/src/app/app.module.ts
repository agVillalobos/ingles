import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {routing, appRoutingProviders} from './app.routing';

//Componentes
import { AppComponent } from './app.component';
import { VocabularyComponent } from './components/vocabulary/vocabulary.component';
import { AddVocabularyComponent } from './components/add-vocabulary/add-vocabulary.component';
import { HomeComponent } from './components/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    VocabularyComponent,
    AddVocabularyComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    routing,
    FormsModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
