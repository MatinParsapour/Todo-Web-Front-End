import { HttpClient } from '@angular/common/http';
import { DataService } from './../data/data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService extends DataService {

  httpService: HttpClient;

  constructor(http: HttpClient) {
    super("http://localhost:8080",http)
    this.httpService = http;
  }

  getUser(username: any){
    return this.httpService.get("http://localhost:8080/user/get-user/" + username)
  }
}
