import {Component, OnInit, EventEmitter} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {EventosService} from './eventos.service';
import './rxjs-operators';

@Component({
    templateUrl: './eventos-list.component.html',
    styleUrls: ['./eventos-list.component.css'],
    providers: [EventosService]
})
export class EventosListComponent implements OnInit {
    eventos: any[];
    errorMessage:string;


    constructor(private eventosService:EventosService,
                private router:Router) {
    }

    ngOnInit() {
        this.getEventos();
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