import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebService } from 'src/app/services/web.service';
import { TokenService } from 'src/app/services/token.service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  correo = "";
  contrasenia = "";

  constructor(private webService: WebService, private tokenService: TokenService,private router: Router) { }

  ngOnInit(): void {
  }

  iniciarSesion(){
    const data = {
      email: this.correo,
      password: this.contrasenia
    }

    this.webService.iniciarSesion(data).subscribe((response: any) => {
      //console.log(response);
      if(response.statuscode == 200){
        var tokendecodificado: any = jwt_decode(response.data.token)
        this.tokenService.addCaracteristicas(tokendecodificado);
        //console.log(tokendecodificado)
        if(tokendecodificado.type == 'cliente'){
          this.router.navigate(['/catalogo']);
        }else{
          this.router.navigate(['/libreria']);
        }
        //console.log('token');
        //console.log(this.tokenService.getCaracteristicas());
      }else{
        alert('Credenciales invalidas')
      }
    })
  }

}