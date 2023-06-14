import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'momentPipe',
  pure: false
})
export class MomentPipe implements PipeTransform {

  constructor() { }

  transform(value: string, dateFormat: string): any {
        if(moment(value).isValid()) { 
            return moment(value).format(dateFormat);
        }
        else {
            return '';
        }
    }
}