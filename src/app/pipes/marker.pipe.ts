import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'marker',
})
export class MarkerPipe implements PipeTransform {
  transform(value: any, ...args: any): unknown {
    if (args[0] === '') return value;
    for (const text of args) {
      var reText = new RegExp(text, 'gi');
      value = value.replace(reText, '<mark>' + text + '</mark>');
      // value = value.replace(reText,"<span class='highlightText'>" + text + '</span>');
    }
    return value;
  }
}
