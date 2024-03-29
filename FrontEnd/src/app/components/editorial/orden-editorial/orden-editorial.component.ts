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
  indexo:number = 0

  estados:any = [
    {name:'Orden enviada'},
    {name:'Se esta empaquetando la orden'},
    {name:'El repartidor va por la orden'},
    {name:'Orden en camino'},
    {name:'Orden entregada'}
  ]

  constructor(
    private tiendaService:TiendaService
  ) { }

  ngOnInit(): void {
    this.tiendaService.getOrdenes().subscribe((json:any) => {
      //console.log(json)
      this.ordenes = json.data.response.data
    })
  }

  abrirModal(index:number){
    this.indexo = this.ordenes[index].estado
    this.orden = this.ordenes[index]
  }

}
