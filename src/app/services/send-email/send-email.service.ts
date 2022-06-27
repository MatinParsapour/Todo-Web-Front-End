import { HttpClient } from '@angular/common/http';
import { DataService } from './../data/data.service';
import { Injectable } from '@angular/core';
import { Constants } from '../constant';

@Injectable({
  providedIn: 'root'
})
export class SendEmailService extends DataService{

  httpService: HttpClient

  constructor(http: HttpClient) {
    super(Constants.url + "/", http)
    this.httpService = http
  }

  sendEmail(uri: string){
    return this.httpService.get(
      Constants.url + '/email/send-email/' + uri
    );
  }
}
