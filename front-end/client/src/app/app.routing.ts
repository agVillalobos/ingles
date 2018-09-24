import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'

//Components
import { VocabularyComponent } from './components/vocabulary/vocabulary.component'
import { AddVocabularyComponent } from './components/add-vocabulary/add-vocabulary.component'
import { HomeComponent } from './components/home/home.component'

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'vocabulary', component: VocabularyComponent },
    { path: 'add-vocabulary', component: AddVocabularyComponent },
    { path: '**', component: HomeComponent }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);