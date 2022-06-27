import { User } from 'src/app/classes/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DataService } from './../data/data.service';
import { Injectable } from '@angular/core';
import { Constants } from '../constant';

@Injectable({
  providedIn: 'root',
})
export class SettingsService extends DataService {
  private httpService: HttpClient;

  constructor(http: HttpClient) {
    super(Constants.url + '/', http);
    this.httpService = http;
  }

  getUser(userId: any, type: any): Observable<User> {
    return this.httpService.get<User>(
      Constants.url + '/settings/' + userId + '/' + type
    );
  }
}
