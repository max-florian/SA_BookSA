import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SolicitudService } from 'src/app/services/solicitud.service';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {

  requests:any = [];

  constructor(
    private solicitudService:SolicitudService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getRequest();
  }

  getRequest(){
    this.solicitudService.getRequest()
      .subscribe((json: any) => {
        console.log(json)
        this.requests = json.data;
      })
  }

  approveRequest(idBook:any){
    if(window.confirm('¿Confirma la aprobacion del libro?')){
      this.solicitudService.approveRequest(idBook).subscribe((json:any) => {
        console.log(json)
        window.alert(json.message)
        //quitar el libro del array
      })
    }
  }

}
