import { HttpClient } from '@angular/common/http';
import { DataService } from './../data/data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentService extends DataService{

  private httpService: HttpClient

  constructor(http: HttpClient) {
    super("http://localhost:8080/comment", http);
    this.httpService = http;
   }
}
