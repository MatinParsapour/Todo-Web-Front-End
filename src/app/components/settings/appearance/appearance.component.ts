import { ThemeService } from './../../../services/theme/theme.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appearance',
  templateUrl: './appearance.component.html',
  styleUrls: ['./appearance.component.css']
})
export class AppearanceComponent implements OnInit {

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
  }

  themeToggle(){
    this.themeService.toggleTheme()
  }

}
