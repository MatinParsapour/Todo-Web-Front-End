import { User } from './../../classes/user';
import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile-drop-down',
  templateUrl: './profile-drop-down.component.html',
  styleUrls: ['./profile-drop-down.component.css'],
})
export class ProfileDropDownComponent implements OnInit {
  @Input('username') username!: string;
  user!: User

  constructor(private userService: UserService) {}

  ngOnInit(): void {
  }

  getUser() {
    if (!this.username) {
      return;
    }
    this.userService.getUser(this.username).subscribe(
      (response: any) => {
        this.user = response;
      },
      (error: HttpErrorResponse) => {
      }
    );
  }
}
