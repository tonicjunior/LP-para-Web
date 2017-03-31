import {Component,OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import '../../public/css/styles.css';
import {AuthService} from "./auth.service";
@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [AuthService]
})
export class AppComponent implements OnInit {
     usuario :any;
    ok : boolean = false;

    constructor(private router:Router,
                private auth: AuthService) {


        }

 ngOnInit() {
             this.logado();

    }
  logado() {
      this.usuario = this.auth.getCurrentUser();
      if(this.usuario != null )
      {
           return true;
      }else{
          return false;
      }
    }

      sair() {
     this.auth.logout();
     this.ok = false;
         this.router.navigate(['/'])
   
     
    }
}