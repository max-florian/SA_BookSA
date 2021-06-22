import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import { CatalogoService } from 'src/app/services/catalogo.service';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {

  book = {
    titulo:'',
    autor:'',
    precio: 1,
    cantidad: 1,
    generos:[],
    pdf: ''
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

  solicitarLibro(){
    if(window.confirm('¿Confirma la solicitud del nuevo libro?')){
      this.book.generos = this.selectedGen
      //this.bookService.createBook(this.book).subscribe((json:any) => {
      //  window.alert(json.message)
      //})
    }
  }

}
