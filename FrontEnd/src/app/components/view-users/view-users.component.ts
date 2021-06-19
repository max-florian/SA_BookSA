import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {

  users:Array<any> = [];

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.getUsers();
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

}
