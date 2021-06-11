import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private httpClient: HttpClient) { }

  getBooks(){
    return this.httpClient.get('https://my-json-server.typicode.com/cristianncaste18/SA_Books/books');
  }
}
