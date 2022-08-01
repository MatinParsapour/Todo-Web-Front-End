import { Observable } from 'rxjs';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { DataService } from './../data/data.service';
import { Injectable } from '@angular/core';
import { Constants } from '../constant';

@Injectable({
  providedIn: 'root',
})
export class UserService extends DataService {
  httpService: HttpClient;

  constructor(http: HttpClient) {
    super(Constants.url, http);
    this.httpService = http;
  }

  getUser(username: any) {
    return this.httpService.get(Constants.url + '/user/get-user/' + username);
  }

  updateProfileImage(formData: FormData): Observable<HttpEvent<any>> {
    return this.httpService.put<HttpEvent<any>>(
      Constants.url + '/user/update-profile-image',
      formData,
      { reportProgress: true, observe: 'events' }
    );
  }

  getUserByToDoId(todoId: any) {
    return this.httpService.get(
      Constants.url + '/user/get-user-by-todoId/' + todoId
    );
  }
}
