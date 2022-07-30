import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.css'],
})
export class ImageViewerComponent implements OnInit {
  @Input('open') open: boolean = false;
  @Input('imageUrl') imageUrl = '';
  @Output('click') click = new EventEmitter();
  @Output('delete') delete = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  deleteProfile() {
    this.delete.next('');
  }
}
