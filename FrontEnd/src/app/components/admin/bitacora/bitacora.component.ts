import { Component, OnInit } from '@angular/core';
import { BitacoraService } from 'src/app/services/bitacora.service';

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.css']
})
export class BitacoraComponent implements OnInit {
  
  entries:Array<any> = [];
  constructor(
    private bitacoraService: BitacoraService
  ) { }

  ngOnInit(): void {
    this.getBitacora();
  }

  getBitacora(){
    this.bitacoraService.getBitacoraBooks().subscribe(
      (response:any) => {
        this.entries = response.data;
      }, (error) => {
        console.log(error);
      })
  }

}
