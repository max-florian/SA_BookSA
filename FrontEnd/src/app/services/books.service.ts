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

  constructor(
    private httpClient: HttpClient,
    private tokenService:TokenService  
  ) { }
  
  getBooks(){
    const data = this.tokenService.getCaracteristicas()
    return this.httpClient.get(this.serverViewBooks + '/books?idEditorial=' + data.id);
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
    return this.httpClient.post(this.serverAddBook + '/add_book',book);
  }
}
