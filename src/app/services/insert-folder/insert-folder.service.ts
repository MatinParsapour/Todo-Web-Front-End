import { HttpClient } from '@angular/common/http';
import { DataService } from './../data/data.service';
import { Injectable } from '@angular/core';
import { Constants } from '../constant';

@Injectable({
  providedIn: 'root'
})
export class InsertFolderService extends DataService{

  httpService: HttpClient

  constructor(http: HttpClient) {
    super(Constants.url + "/", http);
    this.httpService = http;
  }

  isFolderNameDoplicate(folderName: any){
    return this.httpService.get(Constants.url + "/folder/exists-by-folder-name/" + folderName + "/" + localStorage.getItem("username"))
  }
}
