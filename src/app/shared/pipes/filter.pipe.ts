import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string, key: string[]): any[] {
    return items.filter((item) =>
      key.some((key) => item[key].toLowerCase().includes(searchText.toLowerCase())),
    );
  }
}
