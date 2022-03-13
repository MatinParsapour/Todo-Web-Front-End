import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'summaryPipes',
})
export class SummaryPipesPipe implements PipeTransform {
  transform(value: string, limit?: number): unknown {
    if (!value) {
      return null;
    }

    let distance = limit ? limit : 10;
    let extension = '';
    if (value.includes('.')) {
      extension = value.split('.').splice(-1)[0];
      value = value.replace('.' + extension, '');

      if (value.length <= 10) {
        return value + '.' + extension;
      }
      return value.substring(0, distance) + '... ' + '.' + extension;
    }

    if (value.length >= distance) {
      return value.substr(0, distance) + '...'
    }
    return value
  }
}
