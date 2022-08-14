import { ThemeService } from './../../services/theme/theme.service';
import { NotificationService } from './../../services/notification/notification.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search/search.service';
import { NotificationType } from 'src/app/enum/notification-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  keyword = '';
  results: any[] = [];
  isDark!: boolean
  constructor(
    private searchService: SearchService,
    private router: Router,
    private notifier: NotificationService,
    private themeService: ThemeService
  ) {
    this.isDark = themeService.isThemeDark()
    this.themeService.isDark.subscribe((value: boolean) => {
      this.isDark = themeService.isThemeDark()
    })
  }

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
        this.notifier.notify(
          NotificationType.ERROR,
          error.error.type + ': ' + error.error.message
        );
      }
    );
  }

  open(object: any) {
    this.results = [];
    if (object.name == undefined) {
      this.keyword = object.userName;
      this.router.navigate(['/user/' + object.userName]);
    } else {
      this.keyword = object.name;
      this.router.navigate(['/tag/' + object.name]);
    }
  }
}
