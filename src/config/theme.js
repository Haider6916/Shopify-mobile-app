// import {useDarkMode} from 'react-native-dynamic';
import {useSelector} from 'react-redux';

/**
 * Define Const color use for whole application
 */
export const BaseColor = {
  lightGray: '#EBEBEB',
  whiteColor: '#FFFFFF',
  blackColor: '#000000',
  primaryDark: '#4F4F4F',
  ButtonBackground: '#ECECEC',
  primaryLight: 'rgba(0, 0, 0, 0.4)',
  textPrimaryBold: 'rgba(0, 0, 0, 0.57)',
  statusBarGray: 'rgba(231, 231, 231, 1)',
  headerGray: 'rgba(217, 217, 217, 1)',
  titleGray: 'rgba(0, 0, 0, 0.87)',
  backgroundColor: '#F8F8F8',

  highemphasis: 'rgba(0, 0, 0, 0.87)',
  mediumemphasis: 'rgba(0, 0, 0, 0.65)',
  lowemphasis: 'rgba(0, 0, 0, 0.5)',
  faint: 'rgba(0, 0, 0, 0.3)',
  bordercolor: 'rgba(79, 79, 79, 0.3)',
  blueColor: 'rgba(0, 163, 255, 1)',
  errorColor: 'red',
  btnTxt: 'rgba(13, 13, 13, 0.87)',
  txtInputDarkBack: 'rgba(31, 31, 31, 1)',
};

export const DarkModeColors = {
  lightGray: 'rgba(48, 48, 48, 1)',
  whiteColor: '#FFFFFF',
  blackColor: '#000000',
  primaryDark: '#4F4F4F',
  ButtonBackground: '#ECECEC',
  primaryLight: 'rgba(255, 255, 255, 0.4)',
  textPrimaryBold: 'rgba(255, 255, 255, 0.57)',
  statusBarGray: 'rgba(49, 49, 49, 1)',
  headerGray: 'rgba(54, 54, 54, 1)',
  titleGray: 'rgba(0, 0, 0, 0.87)',
  backgroundColor: 'rgba(20, 20, 20, 1)',

  highemphasis: 'rgba(255, 255, 255, 0.87)',
  mediumemphasis: 'rgba(255, 255, 255, 0.65)',
  lowemphasis: 'rgba(255, 255, 255, 0.5)',
  faint: 'rgba(255, 255, 255, 0.3)',
  bordercolor: 'rgba(79, 79, 79, 0.3)',
  blueColor: 'rgba(121, 191, 255, 1)',
  errorColor: 'red',
  btnTxt: 'rgba(13, 13, 13, 0.87)',
  txtInputDarkBack: 'rgba(31, 31, 31, 1)',
};
/**
 * export theme and colors for application
 * @returns theme,colors
 */
export const useTheme = () => {
  const isDarkMode = useSelector(state => state.user.clientDarkMode);
  // useDarkMode()
  return isDarkMode ? DarkModeColors : BaseColor;
};
