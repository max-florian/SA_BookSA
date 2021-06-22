import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {

  users:Array<any> = [];
  isLogged = false;
  username = "";

  constructor(
    private usersService: UsersService,
    private router:Router,
    private tokenService:TokenService
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.isLogged = this.tokenService.isLogged();
    let caracteristicas = this.tokenService.getCaracteristicas()
    this.username =caracteristicas ? caracteristicas.name : 'name';
  }

  getUsers(){
    this.usersService.getUsers().subscribe(
      (response: any) => {
        this.users = response.data;
      }, (error) => {
        console.log(error);
      }
    )
  }

  deleteUserClickHandler(id_user:number, index:number){
    this.usersService.deleteUser(id_user).subscribe(
      (response:any) => {
        this.users.splice(index, 1)
      }, (error) => {
        console.log(error);
      })
  }

  approveUserClickHandler(id_editorial:number, index:number){
    this.usersService.approveUser(id_editorial).subscribe(
      (response:any) => {
        this.users[index].estado = 1; 
      }, (error) => {
        console.log(error);
      }
    )
  }

  logoutClickHandler(){
    this.tokenService.logout()
    this.router.navigate(['/'])
  }

}
