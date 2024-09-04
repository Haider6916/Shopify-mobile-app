/**
 * check if provided name is valid or not
 * @param name - name string
 * @returns true | false
 */
export const isNameValid = name => {
  var regex = /^[A-Za-z ]+$/;
  if (regex.test(name)) return true;

  return false;
};

export const getMonthName = month => {
  let m;
  if (month == '1' || month == '01') {
    m = 'January';
  }
  if (month == '2' || month == '02') {
    m = 'February';
  }
  if (month == '3' || month == '03') {
    m = 'March';
  }
  if (month == '4' || month == '04') {
    m = 'April';
  }
  if (month == '5' || month == '05') {
    m = 'May';
  }
  if (month == '6' || month == '06') {
    m = 'June';
  }
  if (month == '7' || month == '07') {
    m = 'July';
  }
  if (month == '8' || month == '08') {
    m = 'August';
  }
  if (month == '9' || month == '09') {
    m = 'September';
  }
  if (month == '10') {
    m = 'October';
  }
  if (month == '11') {
    m = 'November';
  }
  if (month == '12') {
    m = 'December';
  }

  return m;
};
