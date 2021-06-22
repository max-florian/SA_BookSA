import { Component, OnInit } from '@angular/core';
import { TiendaService } from 'src/app/services/tienda.service';

@Component({
  selector: 'app-orden-editorial',
  templateUrl: './orden-editorial.component.html',
  styleUrls: ['./orden-editorial.component.css']
})
export class OrdenEditorialComponent implements OnInit {

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
