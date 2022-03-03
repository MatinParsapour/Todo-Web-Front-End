import { HttpClient } from '@angular/common/http';
import { DataService } from './../data/data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService extends DataService {

  constructor(http: HttpClient) {
    super('http://localhost:8080/user/', http);
    this.httpService = http
  }

  httpService: HttpClient;

  isUsernameDoplicate(username: any){
    return this.httpService.get('http://localhost:8081/user/check-username/' + username);
    };
  
}
