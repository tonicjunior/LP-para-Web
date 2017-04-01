import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {EventosService} from './eventos.service';
import './rxjs-operators';


@Component({
    templateUrl: './eventos-detalhes.component.html',
    providers: [EventosService]
})
export class EventosDetalhesComponent implements OnInit {
    evento:any;
    errorMessage:string;
    inscritos: any[];
    quantidadeInscritos : number;
    quantidadePag : number;
    valorPag: number;
    valorTotal : number;
    perc : number;

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
                        this.eventosService.getInscritos(evento.id).subscribe(
                            inscritos =>{
                                this.quantidadePag = 0;
                              
                                this.inscritos = inscritos;
                                this.quantidadeInscritos = inscritos.length;
                                for(let c of inscritos){
                                    if(c.dataDePagamento != null)
                                       this.quantidadePag++;
                                }
                                this.valorPag =  this.quantidadePag * evento.precoDaInscricao;
                                this.valorTotal = evento.numeroEstimadoDeInscritos * evento.precoDaInscricao;  
                                this.perc = (this.valorPag/this.valorTotal);

                            },
                            erro=> null
                        )
                    },error => this.errorMessage = <any>error
                )  
             }
        )
    }

    fechar() {
        this.router.navigate(['/eventos'])
    }

     gerenciarPagamento() {
        this.router.navigate(['/eventos/gerenciar', this.evento.id])
    }
    

}