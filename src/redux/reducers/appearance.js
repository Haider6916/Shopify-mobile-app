import {CHANGE_FONT, CHANGE_THEME, FORCE_APPEARANCE} from '../ACTION_TYPES';

const initialState = {
  theme: null,
  font: null,
  forceDark: null,
};

const appearanceReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_THEME:
      return {
        ...state,
        theme: action.payload,
      };
    case CHANGE_FONT:
      return {
        ...state,
        font: action.payload,
      };
    case FORCE_APPEARANCE:
      return {
        ...state,
        forceDark: action.payload,
      };

    default:
      return state;
  }
};

export default appearanceReducer;
