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
  tipousuario = "cliente";
  usuario = "";
  pass = "";
  rpass = "";
  foto = "";
  extension = "";
  base64textString = [];

  constructor(private webService: WebService, private router: Router) { }

  ngOnInit(): void {
  }

  registrase(){
    let data: any = {
      usuario: this.usuario,
      password: this.pass,
      rpassword: this.rpass
    }


    this.webService.registrarse(data).subscribe((response: any) => {
      if(response == `Usuario registrado`){
        this.router.navigate(["/login"])
      }else{
        alert(response)
      }
    })
  }

}