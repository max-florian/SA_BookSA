import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  private carritoSizeSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  carritoSize$: Observable<number> = this.carritoSizeSubject.asObservable();

  serverCompras = environment.serverCompras;

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getCart(){
    let user_id = this.tokenService.getCaracteristicas().id;
    return this.http.post(`${this.serverCompras}/store/cart`, {user_id});
  }

  async getCartDetail(cart_id:number){
    const cart_detail:any = await this.http.get(`${this.serverCompras}/store/cart/${cart_id}/totals`).toPromise();
    console.log(cart_detail);
    this.carritoSizeSubject.next(cart_detail.reduce((total_items:number, item:any) => total_items + item.cantidad, 0));

    return cart_detail;
  }

  addItemToCart(cart_id:number, product_id:number, quantity:number){

    this.carritoSizeSubject.next(this.carritoSizeSubject.getValue() + quantity);

    return this.http.post(`${this.serverCompras}/store/cart/${cart_id}/product`, {
      product_id,
      quantity,
      replace: false
    })
  }

  removeItemFromCart(cart_id:number, product_id:number, quantity:number){
    this.carritoSizeSubject.next(this.carritoSizeSubject.getValue() - quantity);

    return this.http.post(`${this.serverCompras}/store/cart/${cart_id}/product/delete`, {
      product_id,
    })
  }
}
