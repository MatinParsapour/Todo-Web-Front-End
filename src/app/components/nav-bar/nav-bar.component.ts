import { HttpErrorResponse } from '@angular/common/http';
import { SearchService } from './../../services/search/search.service';
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

  constructor(private cookieService: CookieService,
              private searchService: SearchService) {}

  ngOnInit(): void {
    var username = this.cookieService.get('username');
    if (username != undefined) {
      this.username = username;
    }
  }

  search(element: any) {
    if (element.value == '') {
      return;
    }

    this.searchService.getAll(element.value).subscribe(
      (response: any) => {
        this.results = response;
      },
      (error: HttpErrorResponse) =>{
        console.log(error);   
      }
    )
  }
}
