import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shared-to-do',
  templateUrl: './shared-to-do.component.html',
  styleUrls: ['./shared-to-do.component.css'],
})
export class SharedToDoComponent implements OnInit {
  constructor(private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {}

  close() {
    this.router.navigate([this.route.snapshot.params['username']]);
  }
}
