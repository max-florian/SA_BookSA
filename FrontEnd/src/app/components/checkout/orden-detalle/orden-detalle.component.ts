import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-orden-detalle',
  templateUrl: './orden-detalle.component.html',
  styleUrls: ['./orden-detalle.component.css']
})
export class OrdenDetalleComponent implements OnInit {

  @Input() items:any =  [];
  @Input() canRemoveItem:boolean = false;

  @Output() removeRequest = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  removerItemClickHandler(index:number, product_id:number, quantity:number){
    this.removeRequest.emit({
      index: index,
      product_id: product_id,
      quantity: quantity
    })
  }

}
