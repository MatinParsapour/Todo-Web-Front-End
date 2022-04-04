import { Status } from '../enum/status-type';
import { Category } from './../enum/category-type';
export class ToDo {
  dateTime: any = null;
  id: any;
  isMyDay: boolean = false;
  isStarred: boolean = false;
  note: string = "";
  status!: Status;
  task: string = '';
  category = Category.TASKS
  pictures: any;
}