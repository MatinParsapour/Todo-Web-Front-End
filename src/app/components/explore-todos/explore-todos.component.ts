import { ToDoService } from './../../services/to-do/to-do.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/app/services/user/user.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';
import { NotificationType } from 'src/app/enum/notification-type';

@Component({
  selector: 'app-explore-todos',
  templateUrl: './explore-todos.component.html',
  styleUrls: ['./explore-todos.component.css']
})
export class ExploreTodosComponent implements OnInit {
  id: any
  user: any;
  todo: any;

  constructor(@Inject(MAT_DIALOG_DATA) data: any, 
              private todoService: ToDoService,
              private userService: UserService,
              private notifier: NotificationService) {
    this.id = data.id
  }

  ngOnInit(): void {
    this.getUser()
    this.getToDo()
  }

  getUser(){
    this.userService.getUserByToDoId(this.id).subscribe(
      response => {
        this.user = response
        console.log(this.user);
        
      },
      (error:HttpErrorResponse)=> {
        this.notifier.notify(NotificationType.ERROR, error.error)
      }
    )
  }

  getToDo(){
    this.todoService.getToDo("to-do/get-to-do/" + this.id).subscribe(
      response => {
        this.todo = response
      },
      (error: HttpErrorResponse) => {
        this.notifier.notify(NotificationType.ERROR, error.error);
      }
    )
  }

}
