import { HttpClient } from '@angular/common/http';
import { DataService } from './../data/data.service';
import { Injectable } from '@angular/core';
import { Constants } from '../constant';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService extends DataService {

  httpService: HttpClient

  constructor(http: HttpClient) {
    super(Constants.url + "/user", http)
    this.httpService = http
  }
}
