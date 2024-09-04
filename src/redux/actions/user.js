import {
  IS_LOGGED_IN,
  SET_CURRENT_USER,
  STORE_ID,
  UUID,
  CART_ITEMS,
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

const setIsLoggedIn = details => {
  return {
    type: IS_LOGGED_IN,
    payload: details,
  };
};

const setCurrentUserDetails = details => {
  return {
    type: SET_CURRENT_USER,
    payload: details,
  };
};

const setStoreId = details => {
  return {
    type: STORE_ID,
    payload: details,
  };
};

const setUuid = details => {
  return {
    type: UUID,
    payload: details,
  };
};

const setItemToCart = details => {
  return {
    type: CART_ITEMS,
    payload: details,
  };
};
const setUserAccessToken = details => {
  return {
    type: USER_ACCESS_TOKEN,
    payload: details,
  };
};

const setIsEmailVerified = details => {
  return {
    type: IS_EMAIL_VERIFIED,
    payload: details,
  };
};

const setIsUserRegiaster = details => {
  return {
    type: IS_USER_REGISTER,
    payload: details,
  };
};

const setClientDarkMode = details => {
  return {
    type: CLIENT_DARK_MODE,
    payload: details,
  };
};

const setAppLogo = details => {
  return {
    type: APP_LOGO_URL,
    payload: details,
  };
};

const setAppLogoDark = details => {
  return {
    type: APP_LOGO_URL_DARK,
    payload: details,
  };
};

const setItemsinBag = details => {
  return {
    type: ITEM_IN_BAG,
    payload: details,
  };
};

const setAllowScroll = details => {
  return {
    type: ALLOW_SCROLL,
    payload: details,
  };
};

const setShowBag = details => {
  return {
    type: SHOW_BAG,
    payload: details,
  };
};

export const onSetIsLoggedIn = details => dispatch => {
  dispatch(setIsLoggedIn(details));
};

export const onSetCurrentUserDetails = details => dispatch => {
  dispatch(setCurrentUserDetails(details));
};

export const onSetStoreId = details => dispatch => {
  dispatch(setStoreId(details));
};

export const onSetUuid = details => dispatch => {
  dispatch(setUuid(details));
};

export const onSetItemToCart = details => dispatch => {
  dispatch(setItemToCart(details));
};

export const onSetUserAccessToken = details => dispatch => {
  dispatch(setUserAccessToken(details));
};

export const onSetIsEmailVerified = details => dispatch => {
  dispatch(setIsEmailVerified(details));
};

export const onSetIsUserRegiaster = details => dispatch => {
  dispatch(setIsUserRegiaster(details));
};

export const onSetClientDarkMode = details => dispatch => {
  dispatch(setClientDarkMode(details));
};

export const onSetAppLogo = details => dispatch => {
  dispatch(setAppLogo(details));
};

export const onSetAppLogoDark = details => dispatch => {
  dispatch(setAppLogoDark(details));
};

export const onSetItemsInBag = details => dispatch => {
  dispatch(setItemsinBag(details));
};

export const onSetAllowScroll = details => dispatch => {
  dispatch(setAllowScroll(details));
};

export const onSetShowBag = details => dispatch => {
  dispatch(setShowBag(details));
};
