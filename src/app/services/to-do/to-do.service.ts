import { Observable } from 'rxjs';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { DataService } from './../data/data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToDoService extends DataService{

  httpService: HttpClient

  constructor(http: HttpClient) {
    super("http://localhost:8080/",http)
    this.httpService = http
   }

   getToDo(uri:any){
    return this.httpService.get("http://localhost:8080/" + uri)     
  }
  
  addToDoToList(uri:any){
    return this.httpService.put("http://localhost:8080/" + uri, null)     
  }

  sendPicture(formData: FormData):Observable<HttpEvent<any>>{
    return this.httpService.put<HttpEvent<any>>(
      'http://localhost:8080/to-do/add-photo',
      formData,
      { reportProgress: true, observe: 'events' }
    );
  }
}
