import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.css']
})
export class BitacoraComponent implements OnInit {
  
  entries:Array<any> = [];
  constructor(
  ) { }

  ngOnInit(): void {
  }

}
