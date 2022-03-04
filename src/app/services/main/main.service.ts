import { HttpClient } from '@angular/common/http';
import { DataService } from './../data/data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService extends DataService {

  constructor(http:HttpClient) {
    super("http://localhost:8080", http);
  }
}
