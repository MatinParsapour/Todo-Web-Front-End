import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToDo } from './../../classes/todo';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-edit-to-do',
  templateUrl: './edit-to-do.component.html',
  styleUrls: ['./edit-to-do.component.css']
})
export class EditToDoComponent implements OnInit {

  toDo: ToDo = new ToDo

  constructor(@Inject(MAT_DIALOG_DATA) data: any) {
    this.toDo = data.todo
  }

  ngOnInit(): void {
  }

}
