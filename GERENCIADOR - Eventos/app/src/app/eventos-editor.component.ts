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
    quantidadeInscritos : number;
    quantidadePag : number;
    valorPag: number;
    valorTotal : number;
    perc : number;


     quantidadeF : number=0;
        quantidadeM : number =0;
  
    percF : number;
    percM : number;

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
                                                            
                               this.quantidadePag = 0;
                              
                                this.inscritos = inscritos;
                                this.quantidadeInscritos = inscritos.length;
                                for(let c of inscritos){

                                if(c.pessoa.sexo=="M")
                                {
                                    this.quantidadeM++;
                                }else{
                                      this.quantidadeF++;
                                }

               
                                    if(c.dataDePagamento != null)
                                       this.quantidadePag++;
                                }

                                this.valorPag =  this.quantidadePag * evento.precoDaInscricao;
                                this.valorTotal = evento.numeroEstimadoDeInscritos * evento.precoDaInscricao;  
                                this.perc = (this.valorPag/this.valorTotal);
                                 this.percF = (this.quantidadeF/this.quantidadeInscritos);
                                  this.percM = (this.quantidadeM/this.quantidadeInscritos );
                            
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