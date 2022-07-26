import { FollowService } from './../../services/follow/follow.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-lists',
  templateUrl: './user-lists.component.html',
  styleUrls: ['./user-lists.component.css']
})
export class UserListsComponent implements OnInit {
  constructor(private route: ActivatedRoute,
              private followService: FollowService) {}

  ngOnInit(): void {
    this.followService.setUsername(this.route.snapshot.params['username']);
  }

}
