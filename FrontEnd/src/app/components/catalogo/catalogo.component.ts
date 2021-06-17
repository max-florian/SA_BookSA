import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';
import { WebService } from 'src/app/services/web.service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  books:any = [];

  constructor(private bookService:WebService) { }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(){
    this.bookService.getBooks()
      .subscribe(data => {
        this.books = data;
        console.log(this.books)
      })
  }

  deleteBook(id:any){
    console.log('Eliminar: ' + id)
  }

  editBook(id:any){
    console.log('Editar: ' + id)
  }
}

