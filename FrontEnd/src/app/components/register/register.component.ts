import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebService } from 'src/app/services/web.service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  tipousuario = "";
  usuario = "";
  pass = "";
  apellido = "";
  correo = "";
  numero = 0;
  direccion = "";

  constructor(private webService: WebService, private router: Router) { }

  ngOnInit(): void {
  }

  registrarse(){
    let data: any = {
      name: this.usuario,
      lasname: this.apellido,
      email: this.correo,
      password: this.pass,
      status: 1,
      type: this.tipousuario,
      phone: this.numero
    }


    this.webService.registrarse(data).subscribe((response: any) => {
      console.log(response);
      if(response.statuscode == 200){
        alert('Usuario registrado correctamente!');
        this.router.navigate(["/login"]);
      }else{
        alert('Usuario no registrado!');
      }
    })
  }

}