import { ToDo } from './../../classes/todo';
import { ToDoService } from './../../services/to-do/to-do.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-shared-to-do',
  templateUrl: './shared-to-do.component.html',
  styleUrls: ['./shared-to-do.component.css'],
})
export class SharedToDoComponent implements OnInit {
  toDoId: any;
  toDo: ToDo = new ToDo();

  constructor(private activatedRoute: ActivatedRoute,
    private toDoService: ToDoService) {}

  ngOnInit(): void {
    this.getToDoId()
    this.getToDo()
  }

  getToDoId() {
    this.activatedRoute.queryParams.subscribe(
      (parameter: any) => (this.toDoId = parameter['todoId'])
    );
  }

  getToDo() {
    this.toDoService.getToDo('to-do/get-to-do/' + this.toDoId).subscribe(
      (response: any) => {
        this.toDo = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
}
