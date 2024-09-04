/**
 * this file contains all redux actions related to language settings
 */
import {CHANGE_FONT, CHANGE_THEME, FORCE_APPEARANCE} from '../ACTION_TYPES';

const changeTheme = theme => {
  return {
    type: CHANGE_THEME,
    payload: theme,
  };
};

const forceTheme = forceDark => {
  return {
    type: FORCE_APPEARANCE,
    payload: forceDark,
  };
};

const changeFont = font => {
  return {
    type: CHANGE_FONT,
    payload: font,
  };
};

export const onChangeTheme = theme => dispatch => {
  dispatch(changeTheme(theme));
};

export const onForceTheme = mode => dispatch => {
  dispatch(forceTheme(mode));
};

export const onChangeFont = font => dispatch => {
  dispatch(changeFont(font));
};
