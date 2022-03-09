import { ToDoPicturesComponent } from './../to-do-pictures/to-do-pictures.component';
import { ToDo } from './../../classes/todo';
import { EditToDoComponent } from './../edit-to-do/edit-to-do.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from './../../services/notification/notification.service';
import { ToDoService } from './../../services/to-do/to-do.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NotificationType } from 'src/app/enum/notification-type';
import { AggreementComponent } from '../aggreement/aggreement.component';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css'],
})
export class ToDoComponent implements OnInit {
  @Input('toDo') toDo: ToDo = new ToDo();
  @Output('getToDos') getToDos = new EventEmitter();
  displayDatePicker: boolean = false;

  getAllToDos() {
    this.getToDos.next('');
  }

  constructor(
    private toDoService: ToDoService,
    private notifier: NotificationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  starToDo() {
    this.toDo.isStarred = !this.toDo.isStarred;
    this.toDoService.update('to-do/update-to-do', this.toDo).subscribe(
      (response: any) => {
        this.notifier.notify(NotificationType.SUCCESS, 'Success');
      },
      (error: HttpErrorResponse) => {
        this.notifier.notify(NotificationType.ERROR, error.message);
      }
    );
  }

  openAggreementDialog() {
    this.dialog
      .open(AggreementComponent, {
        data: { title: 'Are you sure you want to delete this to do' },
      })
      .afterClosed()
      .subscribe((result: any) => {
        if (result === 'Yes') {
          this.deleteToDo();
        }
      });
  }

  deleteToDo() {
    this.toDoService
      .delete(
        'to-do/delete-to-do/' +
          localStorage.getItem('folder') +
          '/' +
          localStorage.getItem('list') +
          '/' +
          localStorage.getItem('username') +
          '/' +
          this.toDo.id
      )
      .subscribe(
        (response: any) => {
          this.notifier.notify(
            NotificationType.SUCCESS,
            'The to do successfully deleted'
          );
          this.getAllToDos();
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  updateToDoBody(event: any) {
    if (event.innerText !== '') {
      this.toDo.task = event.innerText;
      this.toDoService.update('to-do/update-to-do', this.toDo).subscribe(
        (response: any) => {
          this.notifier.notify(NotificationType.SUCCESS, 'Success');
          this.getAllToDos();
        },
        (error: HttpErrorResponse) => {
          this.notifier.notify(NotificationType.ERROR, error.message);
        }
      );
    }
  }

  openEditToDoDialog() {
    this.dialog
      .open(EditToDoComponent, { data: { todo: this.toDo } })
      .afterClosed()
      .subscribe((result) => {
        this.getToDo()
        if (result === 'delete') {
          this.deleteToDo();
        } else if (result === 'delete-picture') {
          this.openToDoPictures();
        }
      });
  }

  openToDoPictures() {
    this.dialog
      .open(ToDoPicturesComponent, {
        data: { pictures: this.toDo.pictures, toDoId: this.toDo.id },
      })
      .afterClosed()
      .subscribe((result) => {this.openEditToDoDialog(), this.getToDo()});
  }

  changeDisplayOfDatePicker() {
    this.displayDatePicker = true;
  }

  getToDo() {
    this.toDoService.getToDo('to-do/get-to-do/' + this.toDo.id).subscribe(
      (response: any) => {
        this.toDo = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
}
