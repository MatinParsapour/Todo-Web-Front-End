import { Router } from '@angular/router';
import { NewTopicComponent } from './../new-topic/new-topic.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {

  constructor(private dialog: MatDialog, 
    private router: Router) { }

  ngOnInit(): void {
  }

  openNewTopicDialog(){
    this.dialog.open(NewTopicComponent)
  }

  backToMain(){
    this.router.navigateByUrl("/main")
  }
}
