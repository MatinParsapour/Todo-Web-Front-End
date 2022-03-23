import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-manangement',
  templateUrl: './user-manangement.component.html',
  styleUrls: ['./user-manangement.component.css'],
})
export class UserManangementComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  backToMain() {
    this.router.navigateByUrl('/main');
  }
}
