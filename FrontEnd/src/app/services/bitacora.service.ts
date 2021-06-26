import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class BitacoraService {

  serverBitacoraBooks = environment.serverBitacoraBooks;

  constructor(private http: HttpClient) { }

  getBitacoraBooks(){
    return this.http.get(`${this.serverBitacoraBooks}/books`);
  }
}
