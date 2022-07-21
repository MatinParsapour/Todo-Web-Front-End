import { DataService } from './../data/data.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../constant';

@Injectable({
  providedIn: 'root'
})
export class FollowService extends DataService {
  httpService: HttpClient

  constructor(http: HttpClient) {
    super(Constants.url + '/follow-request/', http);
    this.httpService = http;
  }
}
