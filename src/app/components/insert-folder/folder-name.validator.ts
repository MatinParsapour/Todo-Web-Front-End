import { HttpErrorResponse } from '@angular/common/http';
import { InsertFolderService } from './../../services/insert-folder/insert-folder.service';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FolderNameValidator implements AsyncValidator{

    constructor(private insertFolderService: InsertFolderService){}

    validate = (control: AbstractControl) => {
        return this.insertFolderService.isFolderNameDoplicate(control.value).pipe(
            map((response: any) => {
                if (response === true) {
                    return {folderNameIsDoplicate: true}
                } 
                return null
            })
        )
    }
    
}