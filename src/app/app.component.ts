import { ThemeService } from './services/theme/theme.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'website';
  isDark!: boolean;

  constructor(private themeService: ThemeService){
    this.isDark = themeService.isThemeDark()
    themeService.isDark.subscribe((value: boolean) => {
      this.isDark = themeService.isThemeDark()
    })
  }
}
