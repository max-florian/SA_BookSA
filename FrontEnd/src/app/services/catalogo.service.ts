import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {

  serverCatalogo:string = environment.serverCatalogo

  constructor(private httpClient:HttpClient) { }

  getGeneros(){
    return this.httpClient.get(this.serverCatalogo + '/catalogos/generos')
  }

}
