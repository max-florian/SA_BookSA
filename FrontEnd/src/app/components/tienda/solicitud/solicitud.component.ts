import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import { CatalogoService } from 'src/app/services/catalogo.service';
import { SolicitudService } from 'src/app/services/solicitud.service';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {

  book = {
    titulo:'',
    autor:'',
    generos:[],
    file: ''
  }

  selectedGen:any = []
  generoList:any = []

  constructor(
    private solicitudService:SolicitudService,
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
      this.solicitudService.addRequest(this.book).subscribe((json:any) => {
        window.alert(json.message)
      })
    }
  }

}
