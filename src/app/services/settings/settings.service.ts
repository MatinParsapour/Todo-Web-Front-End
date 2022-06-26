import { User } from 'src/app/classes/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DataService } from './../data/data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService extends DataService {
  private httpService: HttpClient;

  constructor(http: HttpClient) {
    super('http://localhost:8080/', http);
    this.httpService = http;
  }

  getUser(userId: any): Observable<User> {
    return this.httpService.get<User>(
      'http://localhost:8080/user/get-user/' + userId
    );
  }
}
