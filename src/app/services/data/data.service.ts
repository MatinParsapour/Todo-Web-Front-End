import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(@Inject(String) private url: string, private http: HttpClient) { }

  getAll(uri: string){
    return this.http.get(this.url + uri)
  }

  create(uri: string, object: any){
    return this.http.post(this.url + uri, object)
  }

  update(uri: string, object: any){
    return this.http.put(this.url + uri, object)
  }

  delete( uri: string){
    return this.http.delete(this.url + uri)
  }
}
