import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}   from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';
import {AppComponent}  from './app.component';
import {EventosListComponent} from './eventos-list.component';
import {EventosEditorComponent} from './eventos-editor.component';
import {PessoasEditorComponent} from './pessoas-editor.component';
import {EventosDetalhesComponent} from './eventos-detalhes.component';
import {PessoaDetalhesComponent} from './pessoa-detalhes.component';
import {PessoasListComponent}      from './pessoas-list.component';
import {routing} from './app.routing';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        EventosListComponent,
        EventosEditorComponent,
        EventosDetalhesComponent,
        PessoasListComponent,
        PessoasEditorComponent,
        PessoaDetalhesComponent
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}