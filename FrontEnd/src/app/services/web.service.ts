import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  serverAuthentication:string = environment.serverAuthentication
  serverCatalogo = environment.serverCatalogo
  serverCompras = environment.serverCompras
  
  constructor(private http: HttpClient) { }

  iniciarSesion(data: { email: string; password: string; }){
    return this.http.post(`${this.serverAuthentication}/login`, data);
  }

  registrarse(data: any){
    return this.http.post(`${this.serverAuthentication}/register`, data);
  }

  getBooks(){
    return this.http.get(`${this.serverCatalogo}/catalogos/catalogo`);
  }

  crearcarrito(data: any){
    return this.http.post(`${this.serverCompras}/store/cart/`, data);
  }

  agregaracarrito(data: any){
    return this.http.post(`${this.serverCompras}/${data.cart_id}/${data.id}`,null);
  }

  
}