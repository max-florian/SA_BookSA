import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  datosForm: FormGroup = this.fb.group({
    username: [{value: '', disabled: true}, Validators.required],
    tipoOrden: ['', Validators.required],
    direccion: ['', this.direccionConditionallyRequiredValidator]
  });

  direccionConditionallyRequiredValidator(formControl: AbstractControl) {
    if(formControl.parent == null) return null;

    if (formControl.parent.get('tipoOrden')?.value == 'domicilio') {
      return Validators.required(formControl); 
    }
    return null;
  }

  get tipoOrden() {
    return this.datosForm.get('tipoOrden');
  }

  carrito:Array<any> = [];
  cart_id:number = 0;

  totalCompra: number = 0;
  loggedUser: any = null;

  paises = [];
  paisseleccionado: any = null;
  
  constructor(
    private cartService: CartService,
    private tokenService: TokenService,
    private fb: FormBuilder,
    private router: Router,
    private _location: Location
  ) { }

  ngOnInit(): void {
    this.cartService.getCart().subscribe((response: any)=> {
      this.cart_id = response.cart_id;

      this.cartService.getCartDetail(this.cart_id).subscribe((response:any) => {
        this.carrito = response;
        let cart_size = response.reduce((total_items:number, item:any) => total_items + item.cantidad, 0);
        this.cartService.pushCartSize(cart_size);
        this.calculateTotalCompra();
      });      
    })


    // Direccion is not watching for changes in tipoOrden so we have to manually subscribe
    this.datosForm.get('tipoOrden')?.valueChanges
    .subscribe(value => {
        this.datosForm.get('direccion')?.updateValueAndValidity();
    });

    this.loggedUser = this.tokenService.getCaracteristicas();

    //Disable username if user is logged
    if(this.loggedUser != null){
      this.datosForm.patchValue({
        username: this.tokenService.getCaracteristicas().name
      });
    }
  }

  calculateTotalCompra(){
    this.totalCompra = this.carrito.reduce((subtotal:number, currentItem:any) => subtotal + currentItem.cantidad * currentItem.precio, 0)
  }

  removerItemClickHandler(data:any){

    let {index, product_id, quantity} = data;
    this.cartService.removeItemFromCart(this.cart_id, product_id, quantity).subscribe(
      (response)=>{},
      (error)=>{console.log(error)}
    );

    this.carrito.splice(index, 1);

    if(this.carrito.length == 0){
      this.router.navigate(['/catalogo']);
    }
    this.calculateTotalCompra();
  }

  atrasClickHandler(){
    this._location.back();
  }

  onSubmitDatos(){
    let direccion = this.datosForm.get('direccion')?.value;
    let data = {
      cart_id:this.cart_id,
      address:direccion,
      payment:1,
      shipping:2
    }

    this.cartService.registrarOrden(data).subscribe((response:any) => {

        this.router.navigate(['/catalogo']);
    }, (error) => {
      console.log(error);
    }

    )
  }

}
