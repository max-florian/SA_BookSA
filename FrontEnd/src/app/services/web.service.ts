import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  serverAuthentication:string = environment.serverAuthentication
  serverCatalogo = environment.serverCatalogo
  serverCompras = environment.serverCompras
  serverESB = environment.serverESB

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  iniciarSesion(data: any){
    return this.http.post(`${this.serverESB}/authentication/login`, data);
  }

  registrarse(data: any){
    return this.http.post(`${this.serverESB}/authentication/register`, data);
  }

  getBooks(){
    let group = this.tokenService.getItem('group');
    console.log('Local Storage - group:',group)
    return this.http.get(`${this.serverESB}/catalogos/catalogo?group=` + group);
  }

  crearcarrito(data: any){
    return this.http.post(`${this.serverCompras}/store/cart/`, data);
  }

  agregaracarrito(data: any){
    return this.http.post(`${this.serverCompras}/${data.cart_id}/${data.id}`,null);
  }


}
