import {Component, OnInit, EventEmitter} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {EventosService} from './eventos.service';
import './rxjs-operators';
import {AuthService} from "./auth.service";

@Component({
    templateUrl: './eventos-list.component.html',
    styleUrls: ['./eventos-list.component.css'],
    providers: [AuthService,EventosService]
})
export class EventosListComponent implements OnInit {
    eventos: any[];
    errorMessage:string;
    usuario :any;
    ok : boolean = false;
    aux : number = 0;


    constructor(private eventosService:EventosService,
                private router:Router,
                private auth: AuthService) {
    }

    ngOnInit() {
        this.getEventos();
        this.logado();
    }
  
  logado() {
      this.usuario = this.auth.getCurrentUser();
      if(this.usuario != null )
      {
            this.ok = true;
            
      }
    }


    getEventos() {
        this.eventosService.getEventos()
            .subscribe(
                eventos => this.eventos = eventos,
                error => this.errorMessage = <any>error);
    }

     detalhar(evento: any) {
        this.router.navigate(['/eventos', evento.id]);
    }


}