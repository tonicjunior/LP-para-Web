import {Component, OnInit, EventEmitter} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {EventosService} from './eventos.service';
import './rxjs-operators';

@Component({
    templateUrl: './pessoas-list.component.html',
    providers: [EventosService]
})
export class PessoasListComponent implements OnInit {
    pessoas: any[];
    errorMessage:string;
    ok: number =2;


    constructor(private eventosService:EventosService,
                private router:Router,
                private route:ActivatedRoute) {
    }

    ngOnInit() {
          this.route.params.subscribe(
            params => {
                if(params['id']=="1")
                {
                   this.ok=1;
                }else{
                    this.ok=2;
                }
            });
        this.getPessoas();
    }

    getPessoas() {
        this.eventosService.getPessoas()
            .subscribe(
                pessoas => this.pessoas = pessoas,
                error => this.errorMessage = <any>error);
    }

     detalhar(id: number) {
        this.router.navigate(['/pessoa/detalhes', id]);
    }

    excluir(id: number) {
        if (confirm("Tem certeza que deseja excluir essa pessoa?")) {
        this.eventosService.deletePessoa(id)
            .subscribe(
                pessoas =>{
                    this.getPessoas();
                },
                error =>{                     
                    this.errorMessage = <any>error});
        }
    }


    cadastrar() {
        this.router.navigate(['/pessoa/cadastro']);
    }

}