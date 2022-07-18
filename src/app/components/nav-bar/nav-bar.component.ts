import { CookieService } from 'ngx-cookie';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  username = '';
  keyword = '';
  results: any[] = []

  constructor(private cookieService: CookieService) {}

  ngOnInit(): void {
    var username = this.cookieService.get('username');
    if (username != undefined) {
      this.username = username;
    }
  }
}
