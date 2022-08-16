import { ThemeService } from './../../services/theme/theme.service';
import { SettingsService } from './../../services/settings/settings.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  username: any;
  isDark: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private settingsService: SettingsService,
    private themeService: ThemeService
  ) {
    this.isDark = themeService.isThemeDark();
    themeService.isDark.subscribe((value: boolean) => {
      this.isDark = themeService.isThemeDark();
    });
  }

  ngOnInit(): void {
    this.isDark = this.themeService.isThemeDark();
    this.username = this.activatedRoute.snapshot.params['username'];
    this.settingsService.setUsername(this.username);
  }
}
