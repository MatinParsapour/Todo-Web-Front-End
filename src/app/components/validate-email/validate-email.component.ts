import { ValidateEmailService } from './../../services/validateEmail/validate-email.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-validate-email',
  templateUrl: './validate-email.component.html',
  styleUrls: ['./validate-email.component.css']
})
export class ValidateEmailComponent implements OnInit {

  email: any;
  code: any;
  isLoading!: boolean
  isPageValid!: boolean;
  error!: HttpErrorResponse

  constructor(private route: ActivatedRoute, private router: Router, private service: ValidateEmailService) { }

  ngOnInit(): void {
    this.isLoading = true
    this.route.queryParams.subscribe(params => 
      {
      this.email = params['email']
      this.code = params['code']
      this.service.sendValidatedUserEmail(this.email, this.code).subscribe(
        (response: any) => {
          this.isPageValid = true
          this.isLoading = false;
        },
        (error: HttpErrorResponse) => {          
          this.isPageValid = false
          this.isLoading = false;
          this.error = error.error;
        }
      );
      })
  }

  goToLogInPage(){
    this.router.navigateByUrl("/login")
  }

}
