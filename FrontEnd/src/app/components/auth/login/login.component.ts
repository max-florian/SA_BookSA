import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebService } from 'src/app/services/web.service';
import { TokenService } from 'src/app/services/token.service';
import { NavBarComponent } from '../../navigation/nav-bar/nav-bar.component';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  correo = "";
  contrasenia = "";
  group = 0;

  constructor(private webService: WebService, private tokenService: TokenService,private router: Router) { }

  ngOnInit(): void {
  }

  iniciarSesion(){

    const data = {
      email: this.correo,
      password: this.contrasenia,
      group: this.group
    }

    console.log('Iniciar:',this.group)
    // Se guarda globalmente el id del grupo
    // console.log(data)
    //if(localStorage.getItem('group')) localStorage.removeItem('group')
    this.tokenService.setItem('group', this.group);
    // localStorage.setItem('group', this.group + '')
    console.log('Consulta',localStorage.getItem('group'))

    this.webService.iniciarSesion(data).subscribe((response: any) => {
      //console.log(response);
      let token = {
        email:'',
        id:'',
        lastname:'',
        name: '',
        type: ''
      }

      if(response.statuscode == 200){
        if(this.group == 0 ){
          token = jwt_decode(response.data.token)
          this.tokenService.addCaracteristicas(token);
          // console.log(tokendecodificado)
          //console.log('somos nosotros')
          
          /*
          email: "brayan.chinchilla@gmail.com"
          exp: 1625368149
          iat: 1625339349
          id: 38
          lastname: null
          name: "Brayan"
          type: "cliente"
          */
        } else if(this.group == 2) {
          token.id = response.data._id
          token.email = response.data.email
          token.name = response.data.nombres
          token.type = response.data.tipo
          this.tokenService.addCaracteristicas(token);
          //grupo 10
          /*
            "_id": "60e0b40877efc50013baaeb1",
          "nombres": "Brayan ",
          "email": "brayan.chinchilla@tiendag10.com",
          "password": "password",
          "direccion": "",
          "celuar": 52064979,
          "tipo": "cliente",
          "aprobado": true,
          */ 
          console.log(response.data)
        } else {
          token.id = response.data._id
          token.email = response.data.correo
          token.name = response.data.nombre
          token.lastname = response.data.apellido
          token.type = response.data.id_rol == 3? 'cliente' : (response.data.id_rol == 1 ? 'editorial' : 'admin') 
          this.tokenService.addCaracteristicas(token);
          /*
          "data": {
              "_id": "60e0b5da8fcd3c001ae67106",
              "nombre": "Testing",
              "apellido": "User",
              "correo": "brayan.chinchilla@tiendag10.com",
              "password": "password",
              "telefono": 52669988,
              "id_rol": 3,
              "estado": 1,
              "__v": 0
          }
          */
        }
        //console.log(token)
        //console.log(tokendecodificado)
        if(token.type == 'cliente'){
          this.router.navigate(['/catalogo']);
        }else if(token.type == 'editorial'){
          this.router.navigate(['/editorial']);
        }else{
          this.router.navigate(['/admin']);
        }
        //console.log('token');
        //console.log(this.tokenService.getCaracteristicas());
      }else{
        window.alert('Credenciales invalidas')
      }
    },
    error => {
      window.alert(error.error.message)
    },)
  }

}