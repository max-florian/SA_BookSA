import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';
import { CatalogoService } from 'src/app/services/catalogo.service';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent implements OnInit {

  book = {
    titulo:'',
    autor:'',
    precio: 1,
    cantidad: 1,
    generos:[],
    group: 0
  }

  selectedGen:any = []
  generoList:any = []

  constructor(
    private bookService:BooksService,
    private catalogoService:CatalogoService
  ) { }

  ngOnInit(): void {
    this.catalogoService.getGeneros().subscribe((json:any) => {
      this.generoList = json.data
    })
  }

  crearLibro(){
    if(window.confirm('¿Confirma la creacion del nuevo libro?')){
      this.book.generos = this.selectedGen
      this.bookService.createBook(this.book).subscribe((json:any) => {
        console.log(json)
        window.alert(json.description)
      })
    }
  }

}
