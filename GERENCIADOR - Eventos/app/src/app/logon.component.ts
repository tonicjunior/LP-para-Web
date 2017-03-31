/**
 * Created by Toni on 31/03/2017.
 */

import {Component, OnInit} from '@angular/core';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import { EventosService } from './eventos.service';


@Component({
    templateUrl: './logon.component.html',
    styleUrls: ['logon.component.css'],
    providers: [AuthService,EventosService]
})
export class LogonComponent implements OnInit {
    username: string;
    password: string;
    error: string = null;
    public login : any;
    pessoas:any[];
     pessoa:any;
   errorMessage:string = '1';
   ok : boolean = false;

    constructor(private auth: AuthService,
     private router: Router,
    private eventosService:EventosService) {
    }

    ngOnInit(): void {
        if (this.auth.loggedIn()) {
           this.router.navigate(['/eventos']);
        }
    }


    entrar() {

  this.eventosService.getPessoas()
            .subscribe(
                pessoas => 
                {
                    this.pessoas = pessoas;
                     pessoas.forEach(c => {
                    if(c.email == this.username && this.password == c.senha )
                    {
                        this.errorMessage = '1';
                        this.pessoa= c;
                        this.ok = true;
                        this.auth.logon(this.pessoa);
                        this.router.navigate(['/eventos']);
                    }
 });

                },
                error => this.error = 'Erro no Login' + <any>error);
                this.errorMessage = '0';
    }

}