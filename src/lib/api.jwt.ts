/**
 * API JWT Auth Functions
 *
 */
import _ from 'lodash';
import jwtDecode from 'jwt-decode';

// Consts and Libs
import AppAPI from './api';
import { APIConfig, AppConfig, ErrorMessages } from '../constants/';

export default class JWT {
    /**
     * Authenticate
     */
    // TODO remove this any type
    getToken: any = credentials => new Promise((resolve, reject) => {
        // Check any existing tokens - if still valid, use it, otherwise login
        const apiToken = this.getStoredToken();
        if (apiToken) return resolve(apiToken);

        // Use credentials or AsyncStore Creds?
        if (!_.isEmpty(credentials)) {
            // Let's try logging in
            return AppAPI[APIConfig.tokenKey].post('login/', {
                username: credentials.username,
                password: credentials.password,
                session_device: 1 // Required to register client in session
            }).then((res) => {
                if (res.token && this.tokenIsValid(res.token)) {
                    this.storeToken(res.token);
                    return resolve(res);
                } else {
                    return reject(res);
                }
            }).catch(err => reject(err));
        } else {
            reject(ErrorMessages.default);
        }
    });

    /**
     * Retrieves Token from Storage
     */
    getStoredToken = () => {
        const apiToken = localStorage.getItem(AppConfig.localStorageKeys.USER_TOKEN);
        if (this.tokenIsValid(apiToken)) {
            return apiToken;
        } else {
            return false;
        }
    };

    /**
     * Adds Token to localStorage
     */
    storeToken = (token) => {
        localStorage.setItem(AppConfig.localStorageKeys.USER_TOKEN, token);
    };

    /**
     * Deletes Token and saved credentials
     * Used for logout
     */
    deleteToken = () => {
        if (localStorage.getItem(AppConfig.localStorageKeys.USER_TOKEN)) {
            AppAPI[APIConfig.tokenKey].post('logout/');
            localStorage.removeItem(AppConfig.localStorageKeys.USER_TOKEN);
        }
    };

    /**
     * Tests whether a token is valid
     */
    tokenIsValid = (token) => {
        let decodedToken;
        try {
            decodedToken = jwtDecode(token);
        } catch (e) {
            // Decode failed, must be invalid
            return false;
        }

        const NOW = (Date.now() / 1000) || 0; // current UTC time in whole seconds
        const eagerRenew = 60; // number of seconds prior to expiry that a token is considered 'old'

        if (decodedToken.iss !== AppConfig.APITokenIssuer) return false;
        if (!decodedToken.user || !decodedToken.session) return false;

        // Validate against 'expiry', 'not before' and 'sub' fields in token
        if (NOW > (decodedToken.exp - eagerRenew)) return false; // Expired
        if (NOW < decodedToken.nbf - 300) return false; // Not yet valid (too early!)

        return true;
    };
}
