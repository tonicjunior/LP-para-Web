/**
 * Created by Toni
 */

import {ModuleWithProviders}  from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {EventosListComponent}      from './eventos-list.component';
import {PessoasListComponent}      from './pessoas-list.component';
import {PessoasEditorComponent} from './pessoas-editor.component';
import {EventosDetalhesComponent} from './eventos-detalhes.component';
import {EventosEditorComponent} from './eventos-editor.component';
import {PessoaDetalhesComponent} from './pessoa-detalhes.component';


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
        path: 'pessoas',
        component: PessoasListComponent
    },
    {
        path: 'pessoas/:id',
        component: PessoasListComponent
    },
    {
        path: 'pessoa/cadastro',
        component: PessoasEditorComponent
    },
    {
        path: 'pessoa/detalhes/:id',
        component: PessoaDetalhesComponent
    },
    {
        path: '',
        component: EventosListComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

