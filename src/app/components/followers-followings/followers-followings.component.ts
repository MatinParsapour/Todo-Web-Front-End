import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-followers-followings',
  templateUrl: './followers-followings.component.html',
  styleUrls: ['./followers-followings.component.css'],
})
export class FollowersFollowingsComponent implements OnInit {
  isDisplay = false;
  list: any;
  type = '';

  constructor() {}

  ngOnInit(): void {}

  open(list: any, type: string) {
    this.type = type;
    this.list = list;
    this.isDisplay = true;
    console.log(this.list);
  }

  close() {
    this.isDisplay = false;
    this.list = [];
  }
}
