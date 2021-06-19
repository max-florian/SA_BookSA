import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';
import { CartService } from 'src/app/services/cart.service';
import { WebService } from 'src/app/services/web.service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  books:any = [];

  cart_id:number = 0;

  constructor(private bookService:WebService, private cartService: CartService) { }

  ngOnInit(): void {
    this.getBooks();
    this.getCarrito();
  }

  getCarrito(){
    this.cartService.getCart().subscribe((response: any)=> {
      this.cart_id = response.cart_id;
      this.cartService.getCartDetail(this.cart_id).subscribe((response:any) => {
        let cart_size = response.reduce((total_items:number, item:any) => total_items + item.cantidad, 0);
        this.cartService.pushCartSize(cart_size);
      });
    })
  }

  getBooks(){
    this.bookService.getBooks()
      .subscribe(data => {
        this.books = data;
        //console.log(this.books)
      })
  }

  agregarProductoAlCarrito(data:any){
    let producto = data.producto;
    let cantidad = data.cantidad;

    console.log(this.cart_id, producto.id, cantidad)
    this.cartService.addItemToCart(this.cart_id, producto.id, cantidad).subscribe(
      (response:any)=>{

      },(error)=>{
        console.log(error);
      }
    );
  }
}

