import { Observable } from 'rxjs';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { DataService } from './../data/data.service';
import { Injectable } from '@angular/core';
import { Constants } from '../constant';

@Injectable({
  providedIn: 'root'
})
export class ToDoService extends DataService{

  httpService: HttpClient

  constructor(http: HttpClient) {
    super(Constants.url + "/",http)
    this.httpService = http
   }

   getToDo(uri:any){
    return this.httpService.get(Constants.url + "/" + uri)     
  }
  
  addToDoToList(uri:any){
    return this.httpService.put(Constants.url + "/" + uri, null)     
  }

  sendPicture(formData: FormData):Observable<HttpEvent<any>>{
    return this.httpService.put<HttpEvent<any>>(
      Constants.url + '/to-do/add-photo',
      formData,
      { reportProgress: true, observe: 'events' }
    );
  }

  like(data: FormData): Observable<any>{
    return this.httpService.put(Constants.url + "/to-do/like", data)
  }

  disLike(data: FormData): Observable<any>{
    return this.httpService.put(Constants.url + "/to-do/dislike", data)
  }
}
