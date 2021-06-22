import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.css']
})
export class BitacoraComponent implements OnInit {

  isLogged = false;
  username = "";
  
  constructor(
    private router:Router,
    private tokenService:TokenService
  ) { }

  ngOnInit(): void {
    this.isLogged = this.tokenService.isLogged();
    let caracteristicas = this.tokenService.getCaracteristicas()
    this.username =caracteristicas ? caracteristicas.name : 'name';
  }

  logoutClickHandler(){
    this.tokenService.logout()
    this.router.navigate(['/'])
  }

}
