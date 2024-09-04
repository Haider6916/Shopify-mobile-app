/**
 * this file contains all formate applied ons
 */

/**
 * add comma's in at thousand place
 * @param x have to convert with comma at thousand place
 * @returns formated as string
 */
export const withCommas = (x) => {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * add comma's in or string at thousand place Only before point
 * @param nStr have to convert with comma at thousand place
 * @returns formated as string
 */
export const addCommas = (nStr) => {
  nStr += '';
  var x = nStr?.toString().split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
};

export const addStr = (str, index, stringToAdd) => {
  return (
    str.substring(0, index) + stringToAdd + str.substring(index, str.length)
  );
};

export const addDash = (
  str,
  stringToAdd,
  afterHowMany,
) => {
  let length = str.length;
  let newString = str;
  let check = 0;
  for (let i = 1; i < length; i++) {
    if (i % afterHowMany === 0) {
      newString = addStr(newString, i + check, stringToAdd);
      check++;
    }
  }
  return newString;
};
