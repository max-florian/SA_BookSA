import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {

  serverCompras: string = environment.serverCompras

  constructor(
    private httpClient:HttpClient,
    private tokenService:TokenService
  ) { }

  getOrdenes(){
    const id = this.tokenService.getCaracteristicas().id
    return this.httpClient.get( this.serverCompras+ '/store/order/' + id)
  }
}
