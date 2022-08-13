import { CookieService } from 'ngx-cookie';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  public static THEME = "theme";
  public static DARK = "dark";
  public static LIGHT = "light";
  isDark = new Subject<boolean>()

  constructor(private cookieService: CookieService) { }

  toggleTheme(){
    if (this.cookieService.get(ThemeService.THEME) == ThemeService.DARK) {
      this.cookieService.put(ThemeService.THEME,ThemeService.LIGHT);
    } else {
      this.cookieService.put(ThemeService.THEME, ThemeService.DARK)
    }
    this.isDark.next(true)
  }

  public isThemeDark(): boolean{
    return this.cookieService.get(ThemeService.THEME) == ThemeService.DARK; 
  }

}
