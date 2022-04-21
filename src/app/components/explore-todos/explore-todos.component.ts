import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-explore-todos',
  templateUrl: './explore-todos.component.html',
  styleUrls: ['./explore-todos.component.css']
})
export class ExploreTodosComponent implements OnInit {
  id: any

  constructor(@Inject(MAT_DIALOG_DATA) data: any) {
    this.id = data.id
  }

  ngOnInit(): void {
    console.log(this.id);
    
  }

}
