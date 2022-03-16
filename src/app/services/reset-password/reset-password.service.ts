import { HttpClient } from '@angular/common/http';
import { DataService } from './../data/data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService extends DataService {

  httpService: HttpClient

  constructor(http: HttpClient) {
    super("http://localhost:8080/email/", http);
    this.httpService = http;
  }

  isEmailValid(email:any, code:any){
    return this.httpService.get(
      'http://localhost:8080/email/verify-email-for-reset-password/' +
        email +
        '/' +
        code
    );
  }
}
