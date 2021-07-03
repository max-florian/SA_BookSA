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

  setItem(key :string,  value: any ){
    localStorage.setItem(key, value)
  }

  getItem(key:string):any {
    return localStorage.getItem(key);
  }

  logout(){
    localStorage.removeItem('data');
    localStorage.removeItem('group');
  }

  isLogged(){
    return this.getCaracteristicas() != null
  }


}
