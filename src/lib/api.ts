/**
 * API Functions
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import axios from 'axios';
// Consts and Libs
import { APIConfig, AppConfig, ErrorMessages } from '../constants';
import JWT from './api.jwt';

// We'll use JWT for API Authentication
// const Token = {};
const Token = new JWT();

// Config
const HOSTNAME = APIConfig.hostname;
const ENDPOINTS = APIConfig.endpoints;

// Enable debug output when in Debug mode
let DEBUG_MODE = AppConfig.DEV && AppConfig.DEBUG;

// Number each API request (used for debugging)
let requestCounter = 0;

/* Helper Functions ==================================================================== */
/**
 * Debug or not to debug
 */
function debug(str, title) {
    if (DEBUG_MODE && (title || str)) {
        if (title) {
            console.log(`=== DEBUG: ${title} ===========================`);
        }
        if (str) {
            console.log(str);
            console.log('%c ...', 'color: #CCC');
        }
    }
}

/**
 * Sends requests to the API
 */
function handleError(err) {
    let error = [];
    if (!err) {
        return ErrorMessages.default;
    }

    if (typeof err === 'string') error = err;
    else if (err.message) error = err.message;
    else if (err.non_field_errors) error = err.non_field_errors.toString();
    else if (err.detail) error = err.detail;
    else if (typeof err === 'object') {
        for (const i in err) {
            error.push(err[i]);
        }
    } else error = ErrorMessages.default;

    return error;
}

/**
 * Convert param object into query string
 * eg.
 *   {foo: 'hi there', bar: { blah: 123, quux: [1, 2, 3] }}
 *   foo=hi there&bar[blah]=123&bar[quux][0]=1&bar[quux][1]=2&bar[quux][2]=3
 */
function serialize(obj, prefix) {
    const str = [];

    Object.keys(obj).forEach((p) => {
        const k = prefix ? `${prefix}[${p}]` : p;
        const v = obj[p];

        str.push((v !== null && typeof v === 'object')
            ? serialize(v, k)
            : `${encodeURIComponent(k)}=${encodeURIComponent(v)}`);
    });

    return str.join('&');
}

/**
 * Sends requests to the API
 */
function fetcher(method, endpoint, params, body, formData) {
    return new Promise((resolve, reject) => {
        requestCounter += 1;
        const requestNum = requestCounter;

        // After x seconds, let's call it a day!
        const timeoutAfter = 7;
        const apiTimedOut = setTimeout(() => (
            reject(ErrorMessages.timeout)
        ), timeoutAfter * 3000);

        if (!method || !endpoint) return reject(ErrorMessages.apiError);

        // Build request
        const req = {
            method: method.toUpperCase(),
            headers: {
                Accept: 'application/json',
                'Content-Type': formData ? 'multipart/form-data' : 'application/json'
            }
        };

        // Add Endpoint Params
        let urlParams = '';
        if (params) {
            // Object - eg. /recipes?title=this&cat=2
            if (typeof params === 'object') {
                urlParams = `?${serialize(params)}`;
                // String or Number - eg. /recipes/23
            } else if (typeof params === 'string' || typeof params === 'number') {
                urlParams = `/${params}`;
                // Something else? Just log an error
            } else {
                debug('You provided params, but it wasn\'t an object!', HOSTNAME + endpoint + urlParams);
            }
        } else {
            urlParams = '/';
        }

        if (urlParams !== '/login/' && urlParams !== '/registration/' && typeof window !== 'undefined') {
            const apiToken = Token.getStoredToken();
            if (apiToken) {
                req.headers.Authorization = `JWT ${apiToken}`;
            }
        }

        // Add Body
        if (body) {
            req.data = formData ? body : JSON.stringify(body);
        }

        const thisUrl = HOSTNAME + endpoint + urlParams;
        debug('', `API Request #${requestNum} to ${thisUrl}`);
        req.url = thisUrl;

        const client = axios.create({});

        return client(req)
            .then(async (response) => {
                clearTimeout(apiTimedOut);
                if (response.status === 200 || response.status === 201) {
                    return response.data;
                }
                throw response;
            })
            .then((res) => {
                debug(res, `API Response #${requestNum} from ${thisUrl}`);
                return resolve(res);
            })
            .catch((error) => {
                clearTimeout(apiTimedOut);
                debug('Failed request', HOSTNAME + endpoint + urlParams);
                debug('Request Failed:', error.config);
                if (error.response) {
                    // Request was made but server responded with something
                    // other than 2xx
                    debug('Status:', error.response.status);
                    debug('Data:', error.response.data);
                    debug('Headers:', error.response.headers);
                    return reject(error.response.data);
                } else {
                    // Something else happened while setting up the request
                    // triggered the error
                    console.error('Error Message:', error.message);
                    return reject(error.message);

                }
            });
    });
}

/* Create the API Export ==================================================================== */
/**
 * Build services from Endpoints
 * - So we can call AppAPI.recipes.get() for example
 */
const AppAPI = {
    handleError,
    getToken: Token.getToken()
    deleteToken: Token.deleteToken
};

ENDPOINTS.forEach((endpoint, key) => {
    AppAPI[key] = {
        get: (params, payload) => fetcher('GET', endpoint, params, payload),
        post: (params, payload, formData) => fetcher('POST', endpoint, params, payload, formData),
        patch: (params, payload, formData) => fetcher('PATCH', endpoint, params, payload, formData),
        put: (params, payload, formData) => fetcher('PUT', endpoint, params, payload, formData),
        options: (params, payload, formData) => fetcher('OPTIONS', endpoint, params, payload, formData),
        delete: (params, payload, formData) => fetcher('DELETE', endpoint, params, payload, formData)
    };
});

/* Export ==================================================================== */
export default AppAPI;
