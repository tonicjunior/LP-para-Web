export class Usuario {
    
    public nome: string;
    public sexo: string;
    public email: string;

    constructor( nome: string ='', sexo: string='M', email: string='') {
        this.nome = nome;
        this.sexo = sexo;
        this.email = email;
    }
}