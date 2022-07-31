import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-to-do-pictures',
  templateUrl: './to-do-pictures.component.html',
  styleUrls: ['./to-do-pictures.component.css'],
})
export class ToDoPicturesComponent implements OnInit {
  pictures: Array<string>;
  toDoId: any;

  constructor(@Inject(MAT_DIALOG_DATA) data: any) {
    this.pictures = data.pictures;
    this.toDoId = data.toDoId;
  }

  ngOnInit(): void {}
}
