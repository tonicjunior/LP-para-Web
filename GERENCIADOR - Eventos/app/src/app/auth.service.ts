/**
 * Created by Toni on 31/03/2017.
 */

import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/add/operator/map';



@Injectable()
export class AuthService {
    public token: string;
    public r: any[];

    constructor(private http: Http) {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

   

    loggedIn() {
        if (localStorage.getItem('currentUser')) {
            return true;
        } else {
            return false;
        }
    }

    getCurrentUser() {
                if (!this.loggedIn())
                        return null;
                let user = JSON.parse(localStorage.getItem('currentUser'));
                return user;
            }

    logon(pessoa: any){
           localStorage.setItem('currentUser', JSON.stringify({
                        id:pessoa.id,
                        nome: pessoa.nome,
                        sexo: pessoa.sexo,
                        email: pessoa.email,
                        tipo: pessoa.tipo,
                    }));
    }

    logout(): void {
        this.token = null;
        localStorage.removeItem('currentUser');
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}