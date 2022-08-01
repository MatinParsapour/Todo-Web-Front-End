import { HttpClient } from '@angular/common/http';
import { DataService } from './../data/data.service';
import { Injectable } from '@angular/core';
import { Constants } from '../constant';

@Injectable({
  providedIn: 'root',
})
export class RegisterService extends DataService {
  constructor(http: HttpClient) {
    super(Constants.url + '/user/', http);
    this.httpService = http;
  }

  httpService: HttpClient;

  isUsernameDoplicate(username: any) {
    return this.httpService.get(
      Constants.url + '/user/check-username/' + username
    );
  }
  isEmailDoplicate(email: any) {
    return this.httpService.get(Constants.url + '/user/check-email/' + email);
  }
}
