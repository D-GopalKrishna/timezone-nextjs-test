/**
 * Global App Config
 *
 */

import AppAPI from './api';

let environment = 'production';
let reCaptchaKey = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';
let reCaptchaKeyInvisible = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';
if (['staging', 'development'].includes(process.env.REACT_APP_ENVIRONMENT)) {
  environment = process.env.REACT_APP_ENVIRONMENT;
}

if (process.env.REACT_APP_RE_CAPTCHA_KEY) {
  reCaptchaKey = process.env.REACT_APP_RE_CAPTCHA_KEY;
}

if (process.env.REACT_APP_RE_CAPTCHA_KEY_INVISIBLE) {
  reCaptchaKeyInvisible = process.env.REACT_APP_RE_CAPTCHA_KEY_INVISIBLE;
}

console.log(
  'Environment: ', environment, 'slug: ', 
  process.env.REACT_APP_CUSTOM_SLUG, 
  (environment !== 'production' && environment !== 'staging')
);

const configVariables = {
  // App Details
  appName: 'Renzo Booking Engine',
  APITokenIssuer: 'Renzo Inc API',
  DEBUG: false,
  DEV: (environment !== 'production' && environment !== 'staging'),
  environment: environment,
  endpoint: AppAPI.hostname,
  hostname: '//renzo.in',
  dashboardHostname: '//booking-engine.io',
  version: process.env.REACT_APP_VERSION,
  buildTime: process.env.REACT_APP_BUILD_TIME,
  bookingHostname: process.env.REACT_APP_HOST_NAME,
  customSlug: process.env.REACT_APP_CUSTOM_SLUG,
  reCaptchaKey: reCaptchaKey,
  reCaptchaKeyInvisible: reCaptchaKeyInvisible,
  localStorageKeys: {
    RELEASE_VERSION: 'system/version',
    USER_TOKEN: 'user/token',
    PROFILE_TOKEN: 'profile/token'
  },
  homeDomains: ['bookingengine.io', 'renzo.in'],
  phoneRegex: /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
};

export default configVariables;
