import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'summaryPipes'
})
export class SummaryPipesPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    if (!value) {
      return null;
    }

    let extension = ""
    extension = value.split('.').splice(-1)[0]
    value = value.replace("." + extension, "")

    if (value.length <=10) {
      return value + "." + extension
    }

    return value.substring(0,10) + '... ' + "." + extension
  }

}
