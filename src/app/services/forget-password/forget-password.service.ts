import { HttpClient } from '@angular/common/http';
import { DataService } from './../data/data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService extends DataService {

  httpService: HttpClient

  constructor(http: HttpClient) {
    super("http://localhost:8080/email/", http);
    this.httpService = http
  }

  sendForgetPasswordEmail(email: any){
    return this.httpService.get("http://localhost:8080/email/forget-password/" + email)
  }
  sendResetEmail(formData: FormData){
    return this.httpService.put("http://localhost:8080/email/reset-email", formData)
  }
}
