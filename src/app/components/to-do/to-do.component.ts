import { ThemeService } from './../../services/theme/theme.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToDoPicturesComponent } from './../to-do-pictures/to-do-pictures.component';
import { ToDo } from './../../classes/todo';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from './../../services/notification/notification.service';
import { ToDoService } from './../../services/to-do/to-do.service';
import { Component, OnInit, Input } from '@angular/core';
import { NotificationType } from 'src/app/enum/notification-type';
import { AggreementComponent } from '../aggreement/aggreement.component';
import { ClipboardService } from 'ngx-clipboard';
import { Status } from 'src/app/enum/status-type';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css'],
})
export class ToDoComponent implements OnInit {
  folders: any;
  @Input('toDo') toDo: ToDo = new ToDo();
  @Input('ownerSees') ownerSees: boolean = false;
  @Input('returnUrl') returnUrl = ''
  displayDatePicker: boolean = false;
  isThemeDark!: boolean

  constructor(
    private toDoService: ToDoService,
    private notifier: NotificationService,
    private dialog: MatDialog,
    private clipBoardService: ClipboardService,
    private router: Router,
    private route: ActivatedRoute,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.isThemeDark = this.themeService.isThemeDark()
  }

  doneToDo() {
    if (this.toDo.status.toString() !== Status[Status.DONE]) {
      this.toDo.status = Status.DONE;
      this.playSound();
    } else {
      this.toDo.status = Status.IN_PROGRESS;
    }
    this.toDoService.update('to-do/update-to-do', this.toDo).subscribe(
      (response: any) => {},
      (error: HttpErrorResponse) => {
        this.notifier.notify(NotificationType.ERROR, error.message);
      }
    );
  }

  playSound() {
    let audio = new Audio();
    audio.src = '../../../assets/audios/Success.mp3';
    audio.play();
  }

  starToDo() {
    this.toDo.isStarred = !this.toDo.isStarred;
    this.toDoService.update('to-do/update-to-do', this.toDo).subscribe(
      (response: any) => {
        this.notifier.notify(NotificationType.SUCCESS, 'Success');
        this.getToDo();
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
        },
        (error: HttpErrorResponse) => {
          this.notifier.notify(
            NotificationType.ERROR,
            error.error.type + ': ' + error.error.messager
          );
        }
      );
  }

  isDone() {
    return this.toDo.status.toString() === Status[Status.DONE];
  }

  openEditToDoDialog() {
    this.router.navigate(['/to-do/', this.toDo.id, 'edit'], {queryParams: {returnUrl: this.returnUrl}})
  }

  openToDoPictures() {
    this.dialog
      .open(ToDoPicturesComponent, {
        data: { pictures: this.toDo.pictures, toDoId: this.toDo.id },
      })
      .afterClosed()
      .subscribe((result) => {
        this.openEditToDoDialog(), this.getToDo();
      });
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
        this.notifier.notify(
          NotificationType.ERROR,
          error.error.type + ': ' + error.error.messager
        );
      }
    );
  }

  getFolders() {
    this.toDoService
      .getAll('folder/get-todo-folders/' + localStorage.getItem('username'))
      .subscribe(
        (response) => {
          this.folders = response;
        },
        (error: HttpErrorResponse) => {
          this.notifier.notify(
            NotificationType.ERROR,
            error.error.type + ': ' + error.error.message
          );
        }
      );
  }

  shareToDo() {
    this.clipBoardService.copy(
      'http://localhost:4200/to-do?todoId=' + this.toDo.id
    );
    this.notifier.notify(
      NotificationType.SUCCESS,
      'Link copied to your clipboard'
    );
  }

  addToList(folderName: any, listName: any) {
    this.toDoService
      .addToDoToList(
        'to-do/add-to-do/' +
          this.toDo.id +
          '/list/' +
          listName +
          '/folder/' +
          folderName +
          '/for/' +
          localStorage.getItem('username')
      )
      .subscribe(
        (response) => {
          this.notifier.notify(
            NotificationType.SUCCESS,
            'Todo added to folder'
          );
        },
        (error: HttpErrorResponse) => {
          this.notifier.notify(
            NotificationType.ERROR,
            error.error.type + ': ' + error.error.messager
          );
        }
      );
  }
}
