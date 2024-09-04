const API_BASE_URL = 'https://appr-server-backend.herokuapp.com/';

/** get Category */
export const GET_SPLASH = API_BASE_URL + 'appDashboard/getAppTheme';

/** get Category */
export const GET_CATEGORY = API_BASE_URL + 'products/getCollections';

/** get Product List */
export const GET_PRODUCT = API_BASE_URL + 'products/GetProducts';

/** get product detail */
export const GET_PRODUCT_DETAIL = API_BASE_URL + 'products/productdetails';

/** get Top Selling Product  */
export const GET_TOPSELLING = API_BASE_URL + 'products/GetTOpSellingProduct';

/** search products  */
// products/searchproducts
export const SEARCH_PRODUCTS = API_BASE_URL + 'products/search';

/** get home screen  */
export const GET_HOME_SCREEN = API_BASE_URL + 'HomeScreen/LoadHomeScreenData';
export const GET_HOME_DASHBOARD = API_BASE_URL + 'appDashboard/getAllSections';
export const GET_HOME_COMPONENTS = API_BASE_URL + 'components/GetComponents';

/** user signup & signin */
export const USER_SIGNUP = API_BASE_URL + 'user/signup';
export const USER_SIGNIN = API_BASE_URL + 'user/login';
export const UPDATE_PROFILE = API_BASE_URL + 'user/UpdateuserProfile';
export const VERIFY_EMAIL = API_BASE_URL + 'user/emailVerification';
export const FORGOT_PASSWORD = API_BASE_URL + 'user/ForgetPassword';
export const RESET_PASSWORD = API_BASE_URL + 'user/resetPassword';
export const RESEND_CODE = API_BASE_URL + 'user/resendVerificationCode';
export const CHANGE_PASSWORD = API_BASE_URL + 'user/changePassword';

/** wishlist */
export const GET_WISHLIST = API_BASE_URL + 'wishList/getWishList';
export const ADD_WISHLIST = API_BASE_URL + 'wishList/addWishList';
export const DEL_WISHLIST = API_BASE_URL + 'wishList/deleteWishList';

/** address */
export const ADD_ADDRESS = API_BASE_URL + 'user/AddAdress';
export const DEL_ADDRESS = API_BASE_URL + 'user/deleteAdress';
export const GET_ADDRESS = API_BASE_URL + 'user/getAdress';
export const UPDATE_ADDRESS = API_BASE_URL + 'user/updateAdress';

/**  checkout and order */
export const ADD_CHECKOUT = API_BASE_URL + 'checkout/addcheckout';
export const CREATE_ORDER = API_BASE_URL + 'order/createOrder';

/**  filters */
export const LOAD_FEATURED = API_BASE_URL + 'products/LoadFeatureProducts';
export const LOAD_NEWEST = API_BASE_URL + 'products/GetNewestProducts';
export const LOAD_TRENDING = API_BASE_URL + 'products/GetTrendingProducts';

/**  Map */
export const GET_SETTING = API_BASE_URL + 'setting/GetAppSetting';
export const GET_SUGGESTIONS =
  API_BASE_URL + 'products/LoadAllProductsToLocalDatabase';

/**  FAQ's */
export const GET_FAQ = API_BASE_URL + 'faqs/viewfaqs';

/** Order History */
export const ORDER_HISTORY = API_BASE_URL + 'order/ViewOrderHistory';

/** Discounted Products Api */
export const DISCOUNTED_PRODUCTS =
  API_BASE_URL + 'products/LoadDiscountProducts';

/** Terms & Condition Api */
export const TERMS_CONDITION = API_BASE_URL + 'policy';
