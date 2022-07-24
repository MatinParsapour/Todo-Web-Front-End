import { ToDoService } from './../to-do/to-do.service';
import { Category } from './../../enum/category-type';
import { Injectable, EventEmitter } from '@angular/core';
import { ToDo } from 'src/app/classes/todo';
import { HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root',
})
export class ToDoDataService {

}
