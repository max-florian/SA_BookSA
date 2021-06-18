import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  constructor(private http: HttpClient) { }

  iniciarSesion(data: { email: string; password: string; }){
    return this.http.post(`http://localhost:4000/api/authentication/login`, data);
  }

  registrarse(data: any){
    return this.http.post(`http://localhost:4000/api/authentication/register`, data);
  }

  getBooks(){
    return this.http.get('http://localhost:3000/catalogo/');
  }

  
}