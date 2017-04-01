import { Component, EventEmitter, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { EventosService } from './eventos.service';

import './rxjs-operators';

@Component({
    templateUrl: './eventos-editor.component.html',
    styleUrls: [],
    providers: [EventosService]
})
export class EventosEditorComponent implements OnInit {
    errorMessage: string;
    ok: number = 2;   
    evento: any;
    inscritos: any[];

    constructor(
        private eventosService:EventosService,
        private route:ActivatedRoute,
        private router: Router) {
    }

    ngOnInit():void {
       this.route.params.subscribe(
            params => {
                this.eventosService.get(params['id']).subscribe(
                    evento =>
                    {                        
                        this.evento = evento;
                        console.log(this.evento);
                        this.eventosService.getInscritosP(evento.id).subscribe(
                            inscritos =>{
                                                            
                                this.inscritos = inscritos;                               
                            },
                            erro=> null
                        )
                    },error => this.errorMessage = <any>error
                )  
             }
        )


    }
   
   confirmar(id : number) : void {
    
        if (confirm("Tem certeza que deseja confirmar o pagamento?")) {
            this.eventosService.pathInscritos(id).subscribe(
                inscritos =>{
                     this.ok = 1;
                    this.ngOnInit(); 
                },
                erro =>{
                    this.errorMessage = erro,
                    this.ok = 0
                } 
            )
        }
    }

   cancelar(id : number) : void {
        if (confirm("Tem certeza que deseja cancelar a inscricao?")) {
            this.eventosService.pathInscritosN(id).subscribe(
                inscritos =>{
                    this.ok = 1;
                    this.ngOnInit(); 
                },
               erro =>{
                    this.errorMessage = erro,
                    this.ok = 0
                } 
            )
        }
    }

   excluir(id : number) : void {
        if (confirm("Tem certeza que deseja excluir a inscricao?")) {
            this.eventosService.deleteInscrito(id).subscribe(
                inscritos =>{
                    this.ok = 1;
                    this.ngOnInit(); 
                },
               erro =>{
                    this.errorMessage = erro,
                    this.ok = 0
                } 
            )
        }
    }

    fechar() {
           this.route.params.subscribe(
            params => {
        this.router.navigate(['/eventos/',params['id']]);
            })
    }

}