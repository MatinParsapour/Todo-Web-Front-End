import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DataService } from './../data/data.service';
import { Injectable } from '@angular/core';
import { Request } from 'src/app/classes/request';
import { Constants } from '../constant';

@Injectable({
  providedIn: 'root'
})
export class SupportService extends DataService {

  httpService: HttpClient

  constructor(http : HttpClient) {
    super(Constants.url + "/", http);
    this.httpService = http
  }

  getRequest(uri: string): Observable<Request> {
    return this.httpService.get<Request>(Constants.url + "/" + uri)
  }
}
