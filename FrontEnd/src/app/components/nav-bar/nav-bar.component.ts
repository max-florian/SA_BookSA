import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  isLogged = false;
  carritoSize$:Observable<number>;

  username = "";

  carritoVisible:boolean = true;

  constructor(
    private tokenService: TokenService,
    private cartService: CartService,
    private router: Router
  ) { 
    this.carritoSize$ = this.cartService.carritoSize$;
  }

  ngOnInit(): void {
    this.isLogged = this.tokenService.isLogged();
    this.username = this.tokenService.getCaracteristicas().name;
    this.carritoVisible = this.router.url != '/checkout'
  }

  logoutClickHandler(){
    this.tokenService.logout();
    this.router.navigate(['']);
  }

}
