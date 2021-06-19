import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-libreria',
  templateUrl: './libreria.component.html',
  styleUrls: ['./libreria.component.css']
})
export class LibreriaComponent implements OnInit {

  books:any = [];

  constructor(
    private bookService:BooksService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(){
    this.bookService.getBooks()
      .subscribe((json: any) => {
        this.books = json.data;
        console.log(this.books)
      })
  }

  deleteBook(id:any){
    if(window.confirm('¿Confirma la eliminacion del libro?')){
      this.bookService.deleteBook(id).subscribe((json:any) => {
        window.alert(json.message)
        //quitar el libro del array
      })
    }
  }

}
