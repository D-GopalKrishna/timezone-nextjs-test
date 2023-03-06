/**
 * API Config
 *
 */

let hostUrl = 'https://api.renzo.in/sys-api/1';

if (['staging', 'development'].includes(process.env.REACT_APP_ENVIRONMENT)) {
  // hostUrl = 'https://api-staging.renzo.in/sys-api/1';

  // if (process.env.REACT_APP_API_ENDPOINT) {
  //   hostUrl = process.env.REACT_APP_API_ENDPOINT;
  // }
}

const API_ENDPOINTS = {
  // The URL we're connecting to
  hostname: hostUrl,

  // Map shortnames to the actual endpoints, so that we can
  // use them like so: AppAPI.ENDPOINT_NAME.METHOD()
  //  NOTE: They should start with a /
  //    eg.
  //    - AppAPI.account.get()
  endpoints: new Map([
    ['bengineapi', '/booking-engine']
  ])
};

export default API_ENDPOINTS;
