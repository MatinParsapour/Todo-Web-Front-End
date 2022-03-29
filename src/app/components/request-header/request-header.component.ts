import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-request-header',
  templateUrl: './request-header.component.html',
  styleUrls: ['./request-header.component.css']
})
export class RequestHeaderComponent implements OnInit {
  @Input('request') request : any

  constructor() { }

  ngOnInit(): void {
  }

}
