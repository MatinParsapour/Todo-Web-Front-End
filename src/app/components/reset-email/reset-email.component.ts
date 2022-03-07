import { HttpErrorResponse } from '@angular/common/http';
import { ValidateEmailService } from './../../services/validateEmail/validate-email.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-email',
  templateUrl: './reset-email.component.html',
  styleUrls: ['./reset-email.component.css']
})
export class ResetEmailComponent implements OnInit {

  email: any;
  isEmailOk = null;

  constructor(private router: Router,private activatedRoute: ActivatedRoute, private validateEmailService: ValidateEmailService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(result => {
      this.email = result['email']
      this.validateEmailService.isEmailValid("http://localhost:8080/email/validate-email/" + result['email']).subscribe(
        (response: any) => {
          this.isEmailOk = response
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      )
    })
  }

  goToMainPage(){
    this.router.navigateByUrl('/main')
  }
}
