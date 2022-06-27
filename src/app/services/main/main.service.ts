import { HttpClient } from '@angular/common/http';
import { DataService } from './../data/data.service';
import { Injectable } from '@angular/core';
import { Constants } from '../constant';

@Injectable({
  providedIn: 'root'
})
export class MainService extends DataService {

  httpService: HttpClient

  constructor(http:HttpClient) {
    super(Constants.url, http);
    this.httpService = http
  }

  getToDos(uri: string){
    return this.httpService.get(Constants.url + uri);
  }
}
