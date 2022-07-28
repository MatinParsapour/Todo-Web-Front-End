import { ToDoDataService } from './../../services/to-do-data/to-do-data.service';
import { Router } from '@angular/router';
import { User } from './../../classes/user';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-profile-drop-down',
  templateUrl: './profile-drop-down.component.html',
  styleUrls: ['./profile-drop-down.component.css'],
})
export class ProfileDropDownComponent implements OnInit {
  @Input('username') username!: string;
  @ViewChild('openMenu') openMenu!: MatMenuTrigger
  folders: any
  user!: User

  constructor(private userService: UserService,
              private router: Router,
              private todoDataService: ToDoDataService) {}

  ngOnInit(): void {
    this.getUser();
    document.getElementById('tasks')?.click();
  }

  openMenuFunc(){
    this.openMenu.openMenu()
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

  navigate(uri: string) {
    this.router.navigate([uri])
  }

  loadCategory(category: any) {
    this.todoDataService.loadCategory(category.value)
    this.navigate(this.username)
  }
}
