import {
  IS_LOGGED_IN,
  CART_ITEMS,
  SET_CURRENT_USER,
  STORE_ID,
  UUID,
  USER_ACCESS_TOKEN,
  IS_EMAIL_VERIFIED,
  IS_USER_REGISTER,
  CLIENT_DARK_MODE,
  APP_LOGO_URL,
  ITEM_IN_BAG,
  ALLOW_SCROLL,
  SHOW_BAG,
  APP_LOGO_URL_DARK,
} from '../ACTION_TYPES';

const initialState = {
  isLogedIn: false,
  currentUser: null,
  storeId: null,
  uuid: null,
  cartItems: null,
  userAccessToken: null,
  isEmailVerified: false,
  isUserRegister: false,
  clientDarkMode: false,
  appLogo: '',
  appLogoDark: '',
  itemInBag: 0,
  allowScroll: true,
  showBag: false,
};

const userReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case IS_LOGGED_IN:
      return {
        ...state,
        isLogedIn: action.payload,
      };

    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };

    case STORE_ID:
      return {
        ...state,
        storeId: action.payload,
      };

    case UUID:
      return {
        ...state,
        uuid: action.payload,
      };

    case CART_ITEMS:
      return {
        ...state,
        cartItems: action.payload,
      };

    case USER_ACCESS_TOKEN:
      return {
        ...state,
        userAccessToken: action.payload,
      };

    case IS_EMAIL_VERIFIED:
      return {
        ...state,
        isEmailVerified: action.payload,
      };

    case IS_USER_REGISTER:
      return {
        ...state,
        isUserRegister: action.payload,
      };

    case CLIENT_DARK_MODE:
      return {
        ...state,
        clientDarkMode: action.payload,
      };

    case APP_LOGO_URL:
      return {
        ...state,
        appLogo: action.payload,
      };

    case APP_LOGO_URL_DARK:
      return {
        ...state,
        appLogoDark: action.payload,
      };

    case ITEM_IN_BAG:
      return {
        ...state,
        itemInBag: action.payload,
      };

    case ALLOW_SCROLL:
      return {
        ...state,
        allowScroll: action.payload,
      };

    case SHOW_BAG:
      return {
        ...state,
        showBag: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
