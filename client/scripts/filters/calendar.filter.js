import Moment from 'moment';
import { Filter } from 'angular-ecmascript/module-helpers';
//this is a simple AngularJS filter that uses moment npm package to 
//convert the date into a formatted text, we will place it in a file named
export default class CalendarFilter extends Filter {
  filter(time) { //this takes a time, and returns a formatted date
    if (!time) return;

    return Moment(time).calendar(null, {
      lastDay : '[Yesterday]',
      sameDay : 'LT',
      lastWeek : 'dddd',
      sameElse : 'DD/MM/YY'
    });
  }
}

CalendarFilter.$name = 'calendar';

//name the exported function as 'calendar'