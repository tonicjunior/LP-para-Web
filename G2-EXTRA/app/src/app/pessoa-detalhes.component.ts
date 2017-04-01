import {Component, OnInit, EventEmitter} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {EventosService} from './eventos.service';
import './rxjs-operators';

@Component({
    templateUrl: './pessoa-detalhes.component.html',
    providers: [EventosService]
})
export class PessoaDetalhesComponent implements OnInit {
    pessoa: any;
    errorMessage:string;



    constructor(private eventosService:EventosService,
                private router:Router,
                private route:ActivatedRoute) {
    }

    ngOnInit() {
          this.route.params.subscribe(
            params => {
                 this.eventosService.getPessoaId(params['id'])
            .subscribe(
                pessoa => this.pessoa = pessoa,
                error => this.errorMessage = <any>error);
            });
   
    }

    


    fechar() {
        this.router.navigate(['/pessoas']);
    }

}