import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shared-to-do',
  templateUrl: './shared-to-do.component.html',
  styleUrls: ['./shared-to-do.component.css'],
})
export class SharedToDoComponent implements OnInit {
  returnTo = '';
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.returnTo = this.route.snapshot.queryParams['returnUrl'];
  }

  close() {
    this.router.navigate([this.route.snapshot.params['username']]);
  }
}
