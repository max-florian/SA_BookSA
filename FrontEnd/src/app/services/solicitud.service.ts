import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  
  serverSolicitud:string = environment.serverSolicitud
  constructor(
    private httpClient: HttpClient,
    private tokenService:TokenService 
  ) { }

  getRequest(){
    return this.httpClient.get(this.serverSolicitud);
  }

  approveRequest(idBook:number){
    const idEditorial = this.tokenService.getCaracteristicas().id
    const payload = {
      idEditorial,
      precio: 1,
      cantidad: 1
    }
    return this.httpClient.patch(this.serverSolicitud + '/aprobar/' + idBook,payload)
  }

  addRequest(book:any){
    book.url = 'https://201503595.s3.us-east-2.amazonaws.com/booksa/libroX.jpg'
    console.log(book)
    return this.httpClient.post(this.serverSolicitud + '/add',book);
  }
}
