import { Component, EventEmitter, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { EventosService } from './eventos.service';
import { Usuario } from './usuario';

import './rxjs-operators';

@Component({
    templateUrl: './pessoas-editor.component.html',
    styleUrls: [],
    providers: [EventosService]
})
export class PessoasEditorComponent implements OnInit {
    errorMessage: string;
    ok: number = 2;   
    evento: any;
    inscritos: any[];
    usuarioNovo: Usuario;

    constructor(
        private eventosService:EventosService,
        private route:ActivatedRoute,
        private router: Router) {
    }

    ngOnInit():void {
      this.usuarioNovo = new Usuario;
     }

   
    salvar(){
       if(this.usuarioNovo.nome!="" && this.usuarioNovo.email!="" )
       {
        this.eventosService.postPessoa(this.usuarioNovo)
            .subscribe(
                usuarioNovo =>{ this.usuarioNovo = usuarioNovo;
                this.ok = 1;   
                this.router.navigate(['/pessoas/',this.ok]) 
                 },
                error =>{ this.errorMessage = <any>error;
                    this.ok = 0;
                    });

       }else
       {
           this.ok = 0;
           this.errorMessage = "Por favor, preencha Todos Campos!!";
       }
   
     }
   

    fechar() {
        this.router.navigate(['/pessoas'])
    }

}