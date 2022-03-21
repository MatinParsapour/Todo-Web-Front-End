import { HttpClient } from '@angular/common/http';
import { DataService } from './../data/data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SendEmailService extends DataService{

  httpService: HttpClient

  constructor(http: HttpClient) {
    super("http://localhost:8080/", http)
    this.httpService = http
  }

  sendEmail(uri: string){
    return this.httpService.get(
      'http://localhost:8080/email/send-email/' + uri
    );
  }
}
