import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  userServer = environment.serverEditorial;
  editorialServer = environment.serverEditorial;

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get(`${this.userServer}/users`);
  }

  deleteUser(id_user:number){
    return this.http.delete(`${this.userServer}/user/${id_user}`)
  }

  approveUser(id_editorial:number){
    return this.http.post(`${this.editorialServer}/aprobar`, {id_editorial})
  }
}
