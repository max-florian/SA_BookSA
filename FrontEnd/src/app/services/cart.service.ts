import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private carritoSizeSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  carritoSize$: Observable<number> = this.carritoSizeSubject.asObservable();

  constructor(private http: HttpClient) { }

  
}
