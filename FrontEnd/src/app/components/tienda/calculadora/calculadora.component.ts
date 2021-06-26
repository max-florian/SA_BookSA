import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent implements OnInit {

  paises: any = [];
  pctimpuesto: any = null;
  cantidad = 0;
  total = 0; 

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.cartService.getPaises().subscribe((data:any) => {
      this.paises = data.data;
      //console.log(this.paises);
    }); 
  }

  getTotal(){
    this.total = this.cantidad * this.pctimpuesto;
  }

}
