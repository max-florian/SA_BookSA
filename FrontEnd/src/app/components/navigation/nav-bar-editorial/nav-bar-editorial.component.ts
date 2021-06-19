import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-nav-bar-editorial',
  templateUrl: './nav-bar-editorial.component.html',
  styleUrls: ['./nav-bar-editorial.component.css']
})
export class NavBarEditorialComponent implements OnInit {

  constructor(
    private router:Router,
    private tokenService:TokenService
  ) { }

  ngOnInit(): void {
  }

  logout(){
    this.tokenService.deleteCaracteristicas()
    this.router.navigate(['/'])
  }

}
