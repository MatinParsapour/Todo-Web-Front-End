import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-topic',
  templateUrl: './new-topic.component.html',
  styleUrls: ['./new-topic.component.css']
})
export class NewTopicComponent implements OnInit {
  request: FormGroup;


  constructor(private fb: FormBuilder) {
    this.request = fb.group({
      priority: new FormControl('', Validators.required),
      topic: new FormControl('', [Validators.required, Validators.minLength(3)])
    })
  }

  ngOnInit(): void {
  }

  priorities = ['low','medium','high']

  get priority():any{
    return this.request.get('priority')
  }

  get topic():any{
    return this.request.get('topic')
  }

  addNewTopic(){
    console.log(this.request.value);
  }

  getTopicErrorMessages(){
    if (this.topic.hasError('required')){
      return "You need to enter topic"
    } else if (this.topic.hasError('minlength')) {
      return 3 - this.topic.value.length + " more characters"
    }

    return null
  }

}
