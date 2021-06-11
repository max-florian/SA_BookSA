import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebService } from 'src/app/web.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  constructor(private webService: WebService, private router: Router) { }

  ngOnInit(): void {
    
    // this.productos = data;
    // console.log(data);
    this.getProducts();
    /*
    //seteamos al usuario por defecto
    // let user = {
    //   id: 36,
    //   name: "Ewan Alsina",
    //   type: "customer"
    // }

    //Seteamos y obtenemos user
    // this.userService.setUser(user);
    this.user = this.userService.getCurrentUser()
    // console.log(this.user);

    // Obtenemos el id del carrito del user

    if(this.user.id == 0 || this.user.id == undefined){
      this.user.id = 584;
      localStorage.setItem('id', '584');
    }

    this.getCarrito();
    */

  }

  /*
  getCarrito(){
    this.cartService.getCarrito({ user_id: this.user.id }).subscribe(
      res => {
        let response : any = res;
        this.cart_id = response.cart_id;
        console.log("CART ID")
        console.log(this.user.id);
        console.log(this.cart_id);
      },
      err => console.error(err)
    );
  }

  comprarProducto(producto : any){
     // Debo añadirlo al carrito.
    let cantidad :any = prompt("Cantidad: ", "1");
    while(isNaN(parseFloat(cantidad))){
      cantidad = prompt("Cantidad: ", "1");
    }

    let detalle = {
      product_id: producto,
      quantity: Number(cantidad),
      replace: 1
    }

    console.log(detalle);

    // Añadimos al carrito
    this.cartService.addToCart(detalle, this.cart_id).subscribe(
      res => {
        console.log(res);
        alert("Producto agregado exitosamente.");
      },
      err => console.log(err)
    );
  }
 


  user: any;
  cart_id : any;
  */
  productos: any;

  // pedidos: any = [];

  getProducts() {
    this.webService.getAllProducts().subscribe(
      (      res: any) => {
        let data : any = res;
        this.productos = data.data;
        console.log(this.productos);
      },
      (      err: any) => console.error(err)
    );
  }
  /*
  detalles(id: string) {
    this.router.navigate(['detalleProducto', id]);
  }
  */
}

