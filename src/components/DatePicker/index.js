import {useEffect, useState} from 'react';
const monthsz = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const months31 = [
  'January',
  'March',
  'May',
  'July',
  'August',
  'October',
  'December',
];

const DatePicker = (
  callDate = false,
  month,
  setCalldate,
  selectedYear,
  dob,
  setDob,
) => {
  const [days, setDays] = useState([]);
  const [months, setMonths] = useState([]);
  const [years, setYears] = useState([]);

  /** initilize the days months and years state */
  useEffect(() => {
    var max = new Date().getFullYear();
    var min = max - 100;
    var yearss = createArray(max, min);
    var dayss = createArray(31, 1);
    setDays(dayss);
    setMonths(monthsz);
    setYears(yearss);
  }, []);

  /** updating number of days accrding to month and years */
  useEffect(() => {
    if (callDate) {
      if (months31.includes(month)) {
        setDayz(31);
      } else if (month === 'February') {
        if (selectedYear !== '' && selectedYear.length > 0) {
          if (leapYear(Number(selectedYear))) {
            check(29);
            setDayz(29);
          } else {
            check(28);
            setDayz(28);
          }
        } else {
          check(28);
          setDayz(28);
        }
      } else {
        check(30);
        setDayz(30);
      }
      setCalldate(false);
    }
  }, [callDate]);

  /** check the input year is leap year */
  const leapYear = year => {
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      return true;
    }
    return false;
  };

  /** setting arrays of days */
  const setDayz = number => {
    let array = Array.from({length: number}, (_, i) => (i + 1).toString());
    setDays(array);
  };

  /** if day on ui is greater than the months days its going to update the selected index and day to empty string */
  const check = dayss => {
    if (dob.day > dayss) {
      setDob({...dob, dayIndex: 0, day: ''});
    }
  };

  /** return array in range between min and max */
  const createArray = (max, min) => {
    let data = [];
    for (var i = max; i >= min; i--) {
      data.push(i.toString());
    }
    return data;
  };

  return {days, months, years};
};

export default DatePicker;
