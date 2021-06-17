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

  correo = "";
  contrasenia = "";

  constructor(private webService: WebService, private router: Router) { }

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
        this.router.navigate(['/catalogo'])
      }else{
        alert('Credenciales invalidas')
      }
    })
  }

}