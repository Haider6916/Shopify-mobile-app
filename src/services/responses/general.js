const GENERAL_RESPONSES = {
  STATUS_OK: {
    CODE: 200,
    MESSAGE: `OK`,
  },
  STATUS_503: {
    CODE: 503,
    MESSAGE: `Service Temporarily Unavailable`,
  },
  UNDEFINED_ERROR: {
    CODE: -0,
    MESSAGE: `Try Again Someother Time`,
  },
  STATUS_409: {
    CODE: 409,
    MESSAGE: 'user already exist with this email',
  },
  STATUS_401_LOGIN: {
    CODE: 401,
    MESSAGE: 'invalid password or email',
  },
  STATUS_500: {
    CODE: 500,
    MESSAGE: 'Server Error!',
  },
};

export default GENERAL_RESPONSES;
