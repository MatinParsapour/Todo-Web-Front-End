import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replacer',
})
export class ReplacerPipe implements PipeTransform {
  transform(value: string, character?: any, changeWith?: any): any {
    value = value.replace(character, changeWith);
    return value;
  }
}
