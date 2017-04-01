import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class EventosService {
    constructor(private http: Http) { }
    private apiUrl = 'http://localhost:3003';

    getEventos() : Observable<any[]> {

        return this.http.get(this.apiUrl+"/eventos")
            .map(this.extractData)
            .catch(this.handleError);
    }
    
   getPessoas() : Observable<any[]> {

        return this.http.get(this.apiUrl+"/pessoas")
            .map(this.extractData)
            .catch(this.handleError);
    }
    // pessoas/{id}

 getPessoaId(id: number) : Observable<any> {
        return this.http.get(this.apiUrl + "/pessoas/" + id)
            .map(this.extractData)
            .catch(this.handleError);
    }



//  /eventos/{id}
    get(id: number) : Observable<any> {
        return this.http.get(this.apiUrl + "/eventos/" + id)
            .map(this.extractData)
            .catch(this.handleError);
    }


// /eventos/{id}/inscritos

  getInscritos(id: number) : Observable<any> {
        return this.http.get(this.apiUrl + "/eventos/" + id +"/inscritos")
            .map(this.extractData)
            .catch(this.handleError);
    }



// (GET /eventos/1/inscritos?_expand=pessoa)


  getInscritosP(id: number) : Observable<any> {
        return this.http.get(this.apiUrl + "/eventos/" + id +"/inscritos?_expand=pessoa")
            .map(this.extractData)
            .catch(this.handleError);
    }


// (PATCH /inscritos/{id})

  pathInscritos(id: number) : Observable<any> {

        let dados = JSON.stringify({"dataDePagamento": "2016-12-04"});
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.patch(this.apiUrl + "/inscritos/" + id,dados, options)
            .map(this.extractData)
            .catch(this.handleError);
    }


  pathInscritosN(id: number) : Observable<any> {

        let dados = JSON.stringify({"dataDePagamento": null});
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.patch(this.apiUrl + "/inscritos/" + id,dados, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

  deleteInscrito(id: number) : Observable<any> {
      
        return this.http.delete(this.apiUrl + "/inscritos/" + id)
            .map(this.extractData)
            .catch(this.handleError);
    }

  deletePessoa(id: number) : Observable<any> {
      
        return this.http.delete(this.apiUrl + "/pessoas/" + id)
            .map(this.extractData)
            .catch(this.handleError);
    }

  postPessoa(pessoa: any) : Observable<any> {
      
        return this.http.post(this.apiUrl + "/pessoas/",pessoa)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); 
        return Observable.throw(errMsg);
    }

}