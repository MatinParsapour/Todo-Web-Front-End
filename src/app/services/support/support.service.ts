import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DataService } from './../data/data.service';
import { Injectable } from '@angular/core';
import { Request } from 'src/app/classes/request';

@Injectable({
  providedIn: 'root'
})
export class SupportService extends DataService {

  httpService: HttpClient

  constructor(http : HttpClient) {
    super("http://localhost:8080/", http);
    this.httpService = http
  }

  getRequest(uri: string): Observable<Request> {
    return this.httpService.get<Request>("http://localhost:8080/" + uri)
  }
}
