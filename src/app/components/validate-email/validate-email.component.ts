import { ValidateEmailService } from './../../services/validateEmail/validate-email.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-validate-email',
  templateUrl: './validate-email.component.html',
  styleUrls: ['./validate-email.component.css']
})
export class ValidateEmailComponent implements OnInit {

  email: any;

  constructor(private route: ActivatedRoute, private router: Router, private service: ValidateEmailService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => 
      {
      this.email = params['email']
      this.service.sendValidatedUserEmail(this.email)
      })
  }

  goToLogInPage(){
    this.router.navigateByUrl("/login")
  }

}
