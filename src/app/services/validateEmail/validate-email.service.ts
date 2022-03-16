import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DataService } from './../data/data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateEmailService extends DataService {

  httpService: HttpClient
  
  constructor(http: HttpClient) {
    super("http://localhost:8080/email/", http);
    this.httpService = http
  }

  sendValidatedUserEmail(email: any, code: any){
    this.httpService.get('http://localhost:8080/email/verify-email/' + email + "/" + code).subscribe(
      (response: any) => {
        console.log(response);
        
      }, 
      (error: HttpErrorResponse) => {
        console.log(error);
        
      }
    );
  }

  isEmailValid(url:string){
    return this.httpService.get(url)
  }
}
