import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from './../../services/notification/notification.service';
import { InsertListService } from './../../services/insert-list/insert-list.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntypedFormControl, Validators, UntypedFormGroup } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { NotificationType } from 'src/app/enum/notification-type';

@Component({
  selector: 'app-insert-list',
  templateUrl: './insert-list.component.html',
  styleUrls: ['./insert-list.component.css']
})
export class InsertListComponent implements OnInit {

  isLoading: boolean = false
  folderName: any;

  listDTO = new UntypedFormGroup({
    userId: new UntypedFormControl(),
    folderName: new UntypedFormControl(),
    listName: new UntypedFormControl('',[Validators.required, Validators.minLength(3)])
  })

  constructor(@Inject(MAT_DIALOG_DATA) data: any,private dialog: MatDialog,
    private insertListService: InsertListService,
    private notifier: NotificationService) { 
      this.folderName = data.folderName
    }

  ngOnInit(): void {
  }

  closeDialog(){
    this.dialog.closeAll()
  }

  getListNameErrorMessages(){
    if (this.listName.hasError('required')) {
      return "You must enter a value"
    }
    return 3 - this.listName.value.length + " more character"
  }

  get listName(): any{
    return this.listDTO.get('listName')
  }

  addList(){
    this.isLoading = true
    this.listDTO.get('userId')?.setValue(localStorage.getItem('username'))
    this.listDTO.get('folderName')?.setValue(this.folderName)
    this.insertListService.update("/list/add-list-to-folder",this.listDTO.value).subscribe(
      (response: any) => {
        this.closeDialog()
        this.notifier.notify(NotificationType.SUCCESS, "The list succeccfully added")
        this.isLoading = false;
      },
      (error: HttpErrorResponse) => {
        this.notifier.notify(NotificationType.ERROR, "Something went wrong, most likely name of the list is doplicate")
        this.isLoading = false;
      }
    )
    
  }

}
