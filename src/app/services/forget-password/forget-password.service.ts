import { HttpClient } from '@angular/common/http';
import { DataService } from './../data/data.service';
import { Injectable } from '@angular/core';
import { Constants } from '../constant';

@Injectable({
  providedIn: 'root',
})
export class ForgetPasswordService extends DataService {
  httpService: HttpClient;

  constructor(http: HttpClient) {
    super(Constants.url + '/email/', http);
    this.httpService = http;
  }

  sendForgetPasswordEmail(email: any) {
    return this.httpService.get(
      Constants.url + '/email/forget-password/' + email
    );
  }
  sendResetEmail(formData: FormData) {
    return this.httpService.put(Constants.url + '/email/reset-email', formData);
  }
}
