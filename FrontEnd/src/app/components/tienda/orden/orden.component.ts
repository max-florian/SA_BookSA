import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { TiendaService } from 'src/app/services/tienda.service';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.css']
})
export class OrdenComponent implements OnInit {

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
      this.ordenes = json.data.response.data
    })
  }
  
  abrirModal(index:number){
    this.indexo = this.ordenes[index].estado
    this.orden = this.ordenes[index]
  }

}
