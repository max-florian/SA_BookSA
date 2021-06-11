import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  constructor(private http: HttpClient) { }

  iniciarSesion(data: { usuario: string; password: string; }){
    return this.http.post(`https://cors-anywhere.herokuapp.com/http://lb-semi1-pro1-503529521.us-east-2.elb.amazonaws.com:3000/login`, data);
  }

  registrarse(data: any){
    return this.http.post(`https://cors-anywhere.herokuapp.com/http://lb-semi1-pro1-503529521.us-east-2.elb.amazonaws.com:3000/registro`, data);
  }

  getAllProducts() {
    return this.http.get(`:5003/get_all_products`);
  }

  
}