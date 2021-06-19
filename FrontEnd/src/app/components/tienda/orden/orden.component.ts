import { Component, OnInit } from '@angular/core';
import { TiendaService } from 'src/app/services/tienda.service';

@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.css']
})
export class OrdenComponent implements OnInit {

  ordenes:any = []
  orden:any = {}

  constructor(
    private tiendaService:TiendaService
  ) { }

  ngOnInit(): void {
    this.tiendaService.getOrdenes().subscribe((json:any) => {
      console.log(json)
      this.ordenes = json.data.response.data
    })
  }

  abrirModal(index:number){
    this.orden = this.ordenes[index]
  }

}
