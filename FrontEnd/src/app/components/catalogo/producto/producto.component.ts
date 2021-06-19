import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  constructor() { }

  @Input() book: any;
  @Output() agregarAlCarritoEvent = new EventEmitter<any>();

  cantidad = 0

  aumentarCantidad(){
    this.cantidad++;
  }

  disminuirCantidad(){
    this.cantidad--;
  }

  agregarAlCarrito(){
    this.agregarAlCarritoEvent.emit({
      producto: this.book, 
      cantidad: this.cantidad
    });
  }

  ngOnInit(): void {
  }
}
