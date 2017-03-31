/**
 * Created by Toni on 31/03/2017.
 */

import {ModuleWithProviders}  from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {EventosListComponent}      from './eventos-list.component';

import {EventosDetalhesComponent} from './eventos-detalhes.component';
import {EventosEditorComponent} from './eventos-editor.component';

import {LogonComponent} from "./logon.component";



const appRoutes: Routes = [
    {
        path: 'eventos',
        component: EventosListComponent
    },
    {
        path: 'eventos/:id',
        component: EventosDetalhesComponent
    },
    {
        path: 'eventos/gerenciar/:id',
        component: EventosEditorComponent
    },   
     {
        path: 'logon',
        component: LogonComponent
    },
    {
        path: '',
        component: EventosListComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

