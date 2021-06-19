import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  serverViewBooks:string = environment.serverViewBooks 
  serverEditBook:string = environment.serverEditBook
  serverAddBook:string = environment.serverAddBook

  constructor(private httpClient: HttpClient) { }
  
  getBooks(){
    return this.httpClient.get(this.serverViewBooks + '?idEditorial=' + 31);
  }

  getBook(id:number){
    return this.httpClient.get(this.serverViewBooks + '/' + id);
  }

  editBook(id:number,book:any){
    return this.httpClient.put(this.serverEditBook + '/' + id,book);
  }


  deleteBook(id:number){
    return this.httpClient.delete(this.serverViewBooks + '/' + id)
  }

  createBook(book:any){
    book.idEditorial = 31
    console.log(book)
    return this.httpClient.post(this.serverAddBook,book);
  }
}
