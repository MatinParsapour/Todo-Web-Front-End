import { ToDoService } from './../to-do/to-do.service';
import { Category } from './../../enum/category-type';
import { Injectable, EventEmitter } from '@angular/core';
import { ToDo } from 'src/app/classes/todo';
import { HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie';
import { NotificationType } from 'src/app/enum/notification-type';

@Injectable({
  providedIn: 'root',
})
export class ToDoDataService {
  private toDos: ToDo[] = [];
  changed = new EventEmitter<boolean>();

  constructor(
    private todoService: ToDoService,
    private cookieService: CookieService,
    private notifier: NotificationService
  ) {}

  loadCategory(category: Category) {
    this.todoService
      .getAll(
        'category/get-category-to-dos/' +
          category +
          '/' +
          this.cookieService.get('username')
      )
      .subscribe(
        (response: any) => {
          this.toDos = response;
          this.changed.emit();
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  loadList(folderName: string, listName: string, username: string) {
    this.todoService
      .getAll(
        '/user/get-to-dos/' +
          localStorage.getItem('list') +
          '/' +
          localStorage.getItem('folder') +
          '/' +
          username
      )
      .subscribe(
        (response: any) => {
          response.toDoFolders.forEach((folder: any) => {
            folder.toDoLists.forEach((list: any) => {
              this.toDos = list.toDos;
            });
          });
          this.changed.emit();
        },
        (error: HttpErrorResponse) => {
          this.notifier.notify(
            NotificationType.ERROR,
            error.error.type + ': ' + error.error.message
          );
        }
      );
  }

  loadStarredToDos(username: string) {
    this.todoService
      .getAll('/to-do/get-starred-todos/' + username)
      .subscribe(
        (response: any) => {
          this.toDos = response;
          this.changed.emit();
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  getToDos() {
    return this.todos.slice();
  }
}
