import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebService } from 'src/app/services/web.service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = "";
  contrasenia = "";

  constructor(private webService: WebService, private router: Router) { }

  ngOnInit(): void {
  }

  iniciarSesion(){
    const data = {
      usuario: this.username,
      password: this.contrasenia
    }

    this.webService.iniciarSesion(data).subscribe((response: any) => {
      if(response == `Usuario Válido`){
        this.router.navigate(['/estudiantes'])
      }else{
        alert('error al iniciar sesión')
      }
    })
  }

}