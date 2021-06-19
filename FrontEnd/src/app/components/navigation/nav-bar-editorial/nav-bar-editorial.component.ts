import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-nav-bar-editorial',
  templateUrl: './nav-bar-editorial.component.html',
  styleUrls: ['./nav-bar-editorial.component.css']
})
export class NavBarEditorialComponent implements OnInit {

  isLogged = false;
  username = "";

  constructor(
    private router:Router,
    private tokenService:TokenService
  ) { }

  ngOnInit(): void {
    this.isLogged = this.tokenService.isLogged();
    this.username = this.tokenService.getCaracteristicas().name;
  }

  logoutClickHandler(){
    this.tokenService.logout()
    this.router.navigate(['/'])
  }

}
