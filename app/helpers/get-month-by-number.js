import Ember from 'ember';

export function getMonthByNumber(params/*, hash*/) {
  let months = {
    1: 'jan',
    2: 'feb',
    3: 'mar',
    4: 'apr',
    5: 'may',
    6: 'jun',
    7: 'jul',
    8: 'aug',
    9: 'sep',
    10: 'oct',
    11: 'nov',
    12: 'dec'
  };
  let passedMonth = parseInt(params[0]);
  return months[passedMonth];
}

export default Ember.Helper.helper(getMonthByNumber);
