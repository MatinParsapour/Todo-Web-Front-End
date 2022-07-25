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
          this.todos = response;
          this.changed.emit();
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  loadList(folderName: string, listName: string) {
    this.changed.emit();
  }

  getToDos() {
    return this.todos.slice();
  }
}
