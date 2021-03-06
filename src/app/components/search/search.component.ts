import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  keyword = '';
  results: any[] = [];
  constructor(private searchService: SearchService,
              private router: Router) {}

  ngOnInit(): void {}

  search(element: any) {
    if (element.value == '') {
      this.results = [];
      return;
    }

    this.searchService.getAll(encodeURIComponent(element.value)).subscribe(
      (response: any) => {
        this.results = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  open(object: any) {
    this.results = []
    if (object.name == undefined) {
      this.keyword = object.userName
      this.router.navigate(['/user/' + object.userName])
    } else {
      this.keyword = object.name
      this.router.navigate(['/tag/' + object.name])
    }
  }
}
