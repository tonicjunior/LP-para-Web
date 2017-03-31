/**
 * Created by Toni on 31/03/2017.
 */

import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private auth: AuthService, private router: Router) {}

    canActivate() {
        if(this.auth.loggedIn()) {
            return true;
        } else {
            this.router.navigate(['logon']);
            return false;
        }
    }
}