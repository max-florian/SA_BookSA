import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  serverViewBooks:string = environment.serverViewBooks 
  serverEditBook:string = environment.serverEditBook
  serverAddBook:string = environment.serverAddBook
  serverESB:string = environment.serverESB
  
  constructor(
    private httpClient: HttpClient,
    private tokenService:TokenService  
  ) { }
  
  getBooks(){
    const data = this.tokenService.getCaracteristicas()
    return this.httpClient.get(this.serverViewBooks + '/books?idEditorial=' + data.id);
    // return this.httpClient.get(this.serverESB + '/books?idEditorial=' + data.id + '&group=' + 2);
  }

  getBook(id:number){
    return this.httpClient.get(this.serverViewBooks + '/books/' + id);
  }

  editBook(id:number,book:any){
    return this.httpClient.put(this.serverEditBook + '/books/' + id,book);
  }


  deleteBook(id:number){
    return this.httpClient.delete(this.serverViewBooks + '/books/' + id)
  }

  createBook(book:any){
    book.idEditorial = this.tokenService.getCaracteristicas().id
    let group = this.tokenService.getItem('group');
    book.group = group
    return this.httpClient.post(this.serverESB + '/add_book',book);
  }
}
