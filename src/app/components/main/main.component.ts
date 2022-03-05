import { slideToDown } from './../../animations';
import { InsertListComponent } from './../insert-list/insert-list.component';
import { NotificationService } from './../../services/notification/notification.service';
import { InsertFolderComponent } from './../insert-folder/insert-folder.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { MainService } from './../../services/main/main.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NotificationType } from 'src/app/enum/notification-type';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  animations: [slideToDown]
})
export class MainComponent implements OnInit {
  toDoFolders: any;
  toDos: any;
  


  constructor(
    private mainService: MainService,
    private dialog: MatDialog,
    private notifier: NotificationService
  ) {}

  ngOnInit(): void {
    this.getAllToDos();
    this.mainService.getToDos("/user/get-to-dos/" + localStorage.getItem("list") + "/" + localStorage.getItem("folder") + "/" + localStorage.getItem("username")).subscribe(
      (response: any) => {
        response.toDoFolders.forEach((folder:any) => {
          folder.toDoLists.forEach((list:any) => {
            this.toDos = list.toDos;            
          });
        });
        
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        
      }
    )
  }


  getAllToDos() {
    this.mainService
      .getAll('/folder/get-todo-folders/' + localStorage.getItem('username'))
      .subscribe(
        (response: any) => {
          this.toDoFolders = response;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  openAddListDialog(folderName: any) {
    this.dialog
      .open(InsertListComponent, { data: { folderName: folderName } })
      .afterClosed()
      .subscribe(() => this.getAllToDos());
  }

  openCreateFolderDialog() {
    this.dialog
      .open(InsertFolderComponent)
      .afterClosed()
      .subscribe(() => {
        this.getAllToDos();
      });
  }

  deleteList(folderName: any, listName: any){
    this.mainService.delete("/list/delete-list/" + listName + "/" + folderName + "/" + localStorage.getItem('username')).subscribe(
      (response: any) => {
        this.notifier.notify(NotificationType.SUCCESS, "The list successfully deleted")
        this.getAllToDos()
      }, 
      (error: HttpErrorResponse) => {
        this.notifier.notify(NotificationType.ERROR, error.message)
        this.getAllToDos()        
      }
    )
  }

  deleteFolder(folderName: any) {
    this.mainService
      .delete(
        '/folder/delete-folder/' +
          localStorage.getItem('username') +
          '/' +
          folderName
      )
      .subscribe(
        (response: any) => {
          this.notifier.notify(
            NotificationType.SUCCESS,
            folderName + ' successfully deleted'
          );
          this.getAllToDos();
        },
        (error: HttpErrorResponse) => {
          this.notifier.notify(NotificationType.ERROR, error.message);
        }
      );
  }
}
