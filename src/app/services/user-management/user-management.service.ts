import { HttpClient } from '@angular/common/http';
import { DataService } from './../data/data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService extends DataService {

  httpService: HttpClient

  constructor(http: HttpClient) {
    super("http://localhost:8080/user", http)
    this.httpService = http
  }
}
