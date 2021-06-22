import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';
import { FormControl } from '@angular/forms';
import { CatalogoService } from 'src/app/services/catalogo.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  idLibro:any = 0

  book = {
    id: 0,
    titulo:'',
    autor:'',
    precio: 0,
    cantidad: 0,
    fecha_creado:'',
    generos:[]
  }

  selectedGen:any = []
  generoList:any = []

  constructor(
    private route: ActivatedRoute,
    private bookService:BooksService,
    private catalogoService:CatalogoService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idLibro = params.get('idLibro');
      this.bookService.getBook(this.idLibro).subscribe((json:any)=>{
        this.book = json.data[0]
        json.generos.forEach((element:any) => {
          this.selectedGen.push(element.id)
        });
        this.catalogoService.getGeneros().subscribe((json:any) => {
          this.generoList = json.data
        })
      })
    });
  }

  editLibro(){
    if(window.confirm('¿Esta seguro que desea modificar el libro?')){
      this.book.generos = this.selectedGen
      this.bookService.editBook(this.book.id,this.book).subscribe((json:any) => {
        window.alert(json.message)
      })
    } 
  }

}
