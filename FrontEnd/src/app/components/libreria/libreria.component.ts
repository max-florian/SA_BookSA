import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-libreria',
  templateUrl: './libreria.component.html',
  styleUrls: ['./libreria.component.css']
})
export class LibreriaComponent implements OnInit {

  books:any = [];

  constructor(private bookService:BooksService) { }

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
