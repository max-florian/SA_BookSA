import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  
  constructor() { }

  addCaracteristicas(data: any) {
    localStorage.setItem('data',JSON.stringify(data))
  }

  getCaracteristicas(): any {
    return JSON.parse(localStorage.getItem('data') + ' ');
  }

  deleteCaracteristicas(){
    localStorage.removeItem('data')
  }


}
