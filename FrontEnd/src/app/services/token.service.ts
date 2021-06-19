import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
    
  constructor() { }

  addCaracteristicas(data: any) {
    localStorage.setItem('data', JSON.stringify(data))
  }

  getCaracteristicas(): any {
    let dataString = localStorage.getItem('data')
    return dataString == null ? null : JSON.parse(dataString);
  }

  logout(){
    localStorage.removeItem('data');
  }

  isLogged(){
    return this.getCaracteristicas() != null
  }


}
