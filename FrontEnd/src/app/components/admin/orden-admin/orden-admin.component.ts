import { Component, OnInit } from '@angular/core';
import { TiendaService } from 'src/app/services/tienda.service';

@Component({
  selector: 'app-orden-admin',
  templateUrl: './orden-admin.component.html',
  styleUrls: ['./orden-admin.component.css']
})
export class OrdenAdminComponent implements OnInit {

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

  updateStatus(orderId:number, offset:number){
    const tmp = this.orden.estado + offset
    if(tmp >= 0 && tmp <= 4){
      this.orden.estado = tmp
      this.indexo = tmp
      this.tiendaService.updateOrden(orderId,tmp).subscribe((json:any)=>{
        console.log(json.message)
      })
    }
  }

}
