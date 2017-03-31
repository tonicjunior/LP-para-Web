import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {EventosService} from './eventos.service';
import './rxjs-operators';
import {AuthService} from "./auth.service";


@Component({
    templateUrl: './eventos-detalhes.component.html',
    providers: [AuthService,EventosService]
})
export class EventosDetalhesComponent implements OnInit {
    evento:any;
    errorMessage:string;
    inscritos: any[];
    inscrito : any;
    quantidadeInscritos : number;
    quantidadePag : number;
    valorPag: number;
    valorTotal : number;
    perc : number;
    usuario : any;
    ok : number;
    adm: boolean = false;

    constructor(private auth: AuthService,
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
                               this.usuario= this.auth.getCurrentUser();
                                this.inscrito =    this.inscritos.find(c=>this.usuario.id == c.pessoaId);                         
                            },
                            erro=> null
                        )
                    },error => this.errorMessage = <any>error
                ) 
             }
        )
        this.logado();
    }

    fechar() {
        this.router.navigate(['/eventos'])
    }

     gerenciarPagamento() {
        this.router.navigate(['/eventos/gerenciar', this.evento.id])
    }

  logado() {
      this.usuario = this.auth.getCurrentUser();
      if(this.usuario.tipo == "administrador")
      {
         
            this.adm = true;
      }
    }


      confirmarPagamento() {
            if (confirm("Tem certeza que deseja confirmar o pagamento?")) {            
            this.eventosService.pathInscritos(this.inscrito.id).subscribe(
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
    
   inscricao() {
            if (confirm("Tem certeza que deseja se Inscrever no evento?")) {
                    
                  

            this.eventosService.postEscrito(this.usuario.id,this.evento.id).subscribe(
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
}