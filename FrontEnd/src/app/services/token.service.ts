import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  
  caracteristicas: any = [];
  
  constructor() { }

  addCaracteristicas(data: any) {
    this.caracteristicas = data;
  }

  getCaracteristicas(): any {
    return this.caracteristicas;
  }


}
