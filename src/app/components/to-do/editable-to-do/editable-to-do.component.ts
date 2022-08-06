import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClipboardService } from 'ngx-clipboard';
import { CookieService } from 'ngx-cookie';
import { ToDo } from 'src/app/classes/todo';
import { NotificationType } from 'src/app/enum/notification-type';
import { Status } from 'src/app/enum/status-type';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ToDoService } from 'src/app/services/to-do/to-do.service';
import { AggreementComponent } from '../../aggreement/aggreement.component';
import { ToDoPicturesComponent } from '../../to-do-pictures/to-do-pictures.component';

@Component({
  selector: 'app-editable-to-do',
  templateUrl: './editable-to-do.component.html',
  styleUrls: ['./editable-to-do.component.css'],
})
export class EditableToDoComponent implements OnInit {
  folders: any;
  toDo: ToDo = new ToDo();
  minDate = new Date();
  canExecute = false;
  slideShowImages: Array<Object> = [];
  isLoading = false;
  uploaded = 0;
  username = '';
  todoId: any;
  @Output('close') close = new EventEmitter();
  @Output('getToDos') getToDos = new EventEmitter();

  statuses = [
    { value: Status.CREATED, viewValue: 'Created' },
    { value: Status.IN_PROGRESS, viewValue: 'In progress' },
    { value: Status.DONE, viewValue: 'Done' },
  ];

  constructor(
    private toDoService: ToDoService,
    private notifier: NotificationService,
    private dialog: MatDialog,
    private clipBoardService: ClipboardService,
    private cookieService: CookieService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.todoId = this.route.snapshot.params['id']
    this.getToDo();
    this.addToQueue();
    let username = this.cookieService.get('username');
    if (username) {
      this.username = username;
    }
  }

  addToQueue() {
    this.slideShowImages = [];
    if (this.toDo.pictures != undefined) {
      this.toDo.pictures.forEach((element: any) => {
        this.slideShowImages.push({ image: element, thumbImage: element });
      });
    }
    this.canExecute = false;
  }

  slideShowSize() {
    return {
      height: '100px',
    };
  }

  updateToDo() {
    if (this.toDo.dateTime) {
      let date = new Date(this.toDo.dateTime);
      let pipe: DatePipe = new DatePipe('en-US');
      let dueToDate = pipe.transform(date, 'yyyy-MM-dd');
      this.toDo.dateTime = dueToDate;
    }

    if (this.toDo.task !== '') {
      this.toDoService.update('to-do/update-to-do', this.toDo).subscribe(
        (response: any) => {
          this.notifier.notify(NotificationType.SUCCESS, 'Your to do updated');
          this.getToDo();
        },
        (error: HttpErrorResponse) => {
          this.notifier.notify(NotificationType.ERROR, error.message);
        }
      );
    }
  }

  selectPhoto() {
    document.getElementById('selectInput')?.click();
  }

  addPhoto(event: any) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('picture', file);
    formData.append('toDoId', this.toDo.id);
    this.isLoading = true;
    this.toDoService.sendPicture(formData).subscribe(
      (event: HttpEvent<any>) => {
        this.reportUploadProgress(event);
      },
      (error: HttpErrorResponse) => {
        this.notifier.notify(
          NotificationType.ERROR,
          error.error.type + ': ' + error.error.messager
        );
      },
      () => {
        this.isLoading = false;
        this.uploaded = 0;
      }
    );
  }

  openToDoPictures() {
    this.dialog.open(ToDoPicturesComponent, {
      data: { pictures: this.toDo.pictures, toDoId: this.toDo.id },
    });
  }

  pinOrUnpinToDo() {
    this.toDo.pinned = !this.toDo.pinned;
    this.updateToDo();
  }

  reportUploadProgress(event: HttpEvent<any>) {
    switch (event.type) {
      case HttpEventType.UploadProgress:
        if (event.total) {
          this.uploaded = (100 * event.loaded) / event.total;
        }
        break;
      case HttpEventType.Response:
        if (event.status === 200) {
          this.notifier.notify(
            NotificationType.SUCCESS,
            'The picture uploaded'
          );
        } else {
          this.notifier.notify(
            NotificationType.ERROR,
            'Unable to upload image, try again'
          );
        }
        this.getToDo();
        break;
    }
  }

  getFolders() {
    this.toDoService
      .getAll('folder/get-todo-folders/' + this.username)
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
      .delete('to-do/delete-to-do/' + this.username + '/' + this.toDo.id)
      .subscribe(
        (response: any) => {
          this.notifier.notify(
            NotificationType.SUCCESS,
            'The to do successfully deleted'
          );
          this.getToDos.emit();
          this.close.emit();
        },
        (error: HttpErrorResponse) => {
          this.notifier.notify(
            NotificationType.ERROR,
            error.error.type + ': ' + error.error.message
          );
        }
      );
  }

  getToDo() {
    this.toDoService.getToDo('to-do/get-to-do/' + this.todoId).subscribe(
      (response: any) => {
        this.toDo = response;
        this.addToQueue();
      },
      (error: HttpErrorResponse) => {
        this.notifier.notify(
          NotificationType.ERROR,
          error.error.type + ': ' + error.error.messager
        );
      }
    );
  }
  toggleStar() {
    this.toDo.isStarred = !this.toDo.isStarred;
  }
  toggleMyDay() {
    this.toDo.isMyDay = !this.toDo.isMyDay;
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
