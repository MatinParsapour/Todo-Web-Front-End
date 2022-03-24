import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutter'
})
export class CutterPipe implements PipeTransform {

  transform(value: string, pos?: any, count?: any): any {
    if (pos === 'first') {
      value = value.substring(count);
    } else if (pos === 'last') {
      value = value.substring(0,count)
    }
    return value;
  }

}
