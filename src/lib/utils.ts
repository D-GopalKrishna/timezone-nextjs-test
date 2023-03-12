/**
 * Global Util Functions
 *
 */
import moment from 'moment-timezone';
import queryString from 'query-string';

const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

function striptags(input) {
    return input.replace(/(<([^>]+)>)/ig, '');
}

const UTIL = {
    /**
     * Calculate room total
     * @param roomData
     * @returns {*}
     */
    calculateRoomTotalsV2: roomData => {
        let room_total = parseFloat(roomData.package.base_price_effective_total);
        // check if room guest is less than base occupancy
        if (
            roomData.no_of_guest < roomData.occupancy_data.base_occupancy &&
            roomData.occupancy_data.sell_below_min_occupancy
        ) {
            let diff_guest = roomData.occupancy_data.base_occupancy - roomData.no_of_guest;
            room_total =
                room_total -
                UTIL.calculateDiscountGuestPrice(roomData.occupancy_data, room_total) *
                diff_guest;
        }

        if (roomData.no_of_guest > roomData.occupancy_data.base_occupancy) {
            let diff_guest = roomData.no_of_guest - roomData.occupancy_data.base_occupancy;
            room_total =
                room_total +
                parseFloat(roomData.package.guest_price_effective_total) * diff_guest;
        }

        // Child Guest
        if (roomData.no_of_child > 0) {
            room_total =
                room_total +
                parseFloat(roomData.package.child_price_effective_total) *
                roomData.no_of_child;
        }

        // Infant guest
        if (roomData.no_of_infant > 0) {
            room_total =
                room_total +
                parseFloat(roomData.package.infant_price_effective_total) *
                roomData.no_of_infant;
        }

        roomData.total = parseFloat(room_total).toFixed(2);

        return roomData;
    },
    /**
     * Returns param value from url
     */
    getURLParam: (url, key) => {
        const params = url.split('?');
        if (params.length === 2) {
            const queryParams = queryString.parse(params[1]);
            if (Object.keys(queryParams).includes(key)) return queryParams[key];
        }
        return false;
    },
    /**
     * Format duration
     * Formats django's default duration field
     */
    formatDuration: (duration) => {
        if (duration) {
            const duration_data = moment.duration(duration.replace(/\s/g, '.'));
            const humanized_data = [];
            if (duration_data.days()) {
                humanized_data.push(`${duration_data.days()} Day`);
            }

            humanized_data.push(`${duration_data.hours()} Hour and ${duration_data.minutes()} Mins`);
            return humanized_data.join(', ');
        }
        return '';
    },
    /**
     * Format Week Days
     */
    formatWeekDays: (weekDaysList, expanded = false) => {
        const daysList = [
            { key: 'Sun', value: 'Sunday' },
            { key: 'Mon', value: 'Monday' },
            { key: 'Tue', value: 'Tuesday' },
            { key: 'Wed', value: 'Wednesday' },
            { key: 'Thu', value: 'Thursday' },
            { key: 'Fri', value: 'Friday' },
            { key: 'Sat', value: 'Saturday' }
        ];
        const activeDays = [];
        if (weekDaysList) {
            daysList.forEach((data) => {
                if (weekDaysList.includes(data.key) || weekDaysList.includes(data.key.toLowerCase())) {
                    if (expanded) {
                        activeDays.push(data.value);
                    } else {
                        activeDays.push(data.key);
                    }
                }
            });
        }
        return activeDays.join(', ');
    },
    /**
     * Dynamic Select inputs
     */
    numericSelector: (start = 0, end = 10, labelPostFix = '') => {
        const selectOptions = [];
        while (start <= end) {
            selectOptions.push({
                value: start,
                label: `${start} ${labelPostFix}`
            });
            start += 1;
        }
        return selectOptions;
    },
    /**
     * Expand Phone number
     */
    processPhoneNumber: (phone) => {
        try {
            return phoneUtil.parse(phone) ? phoneUtil.parseAndKeepRawInput(phone) : null;
        } catch (e) {
            return false;
        }
    },
    /**
     *  Calculates % of 2 numbers
     * */
    calculatePercentage: (data1, data2) => {
        let discount = 0;
        if (parseInt(data1) > 0 && parseInt(data2) > 0) {
            discount = (data1 / data2) * 100;
        }
        return discount.toFixed(2);
    },
    /**
     * Sorts object array based on a key in object
     * @param data
     * @param key
     */
    sortArray: (data, key) => {
        const sortedArray = {};
        data.forEach((data) => {
            let arrayKey = 'default';
            if (data[key]) {
                arrayKey = data[key];
            }
            if (sortedArray[arrayKey]) {
                sortedArray[arrayKey].push(data);
            } else {
                sortedArray[arrayKey] = [data];
            }
        });
        return sortedArray;
    },
    /**
     * Formats price to 2 decimal place
     * @param price
     * @returns {string}
     */
    formatPrice: price => {
        return parseFloat(price).toFixed(2);
    },
    /**
     * Insert / Remove from array
     * @param dataSet Initial array to which in/out is to be added
     * @param data Element to be inserted / removed
     * @returns data array
     */
    insertOrRemoveArray: (dataSet = null, data = null) => {
        if (dataSet && data) {
            if (dataSet.includes(data)) {
                dataSet = dataSet.filter(function (item) {
                    return item !== data;
                });
            } else {
                dataSet.push(data);
            }
            return dataSet;
        }
        return [];
    },
    /**
     * Capitalize first letter
     */
    ucFirst: string => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    /**
     * Days difference
     */
    diffDateTime: (obj1, obj2, format) => {
        const t1 = moment(obj1);
        const t2 = moment(obj2);

        switch (format) {
            case 'seconds':
                return t2.diff(t1, 'seconds');
            case 'hours':
                return t2.diff(t1, 'hours');
            default:
                return t2.diff(t1, 'days');
        }
    },
    /**
     * Format time
     */
    formatDateTime: (obj, format, parseFormat = null, tz = null) => {
        let dateTimeObject;
        if (parseFormat) {
            dateTimeObject = moment(obj, parseFormat);
        } else {
            dateTimeObject = moment(obj);
        }

        // Timezone
        if (tz) {
            dateTimeObject.tz(tz);
        }

        switch (format) {
            case 'time':
                return dateTimeObject.format('h:mm a');
            case 'timez':
                return dateTimeObject.format('h:mm a ZZ');
            case 'date':
                return dateTimeObject.format('Do MMM');
            case 'datef':
                return dateTimeObject.format('Do MMM YYYY');
            case 'short':
                return dateTimeObject.format('DD-MM-YYYY HH:mm');
            case '24':
                return dateTimeObject.format('Do MMM YYYY HH:mm');
            case 'day':
                return dateTimeObject.format('dddd');
            case 'dte':
                return dateTimeObject.format('D');
            case 'month':
                return dateTimeObject.format('MMM');
            case 'year':
                return dateTimeObject.format('YYYY');
            default:
                return dateTimeObject.format('Do MMM YY h:mm a');
        }
    },
    /**
     * Test if Obj is empty
     */
    objIsEmpty: (obj) => {
        if (typeof obj === 'object' && !(obj instanceof Array)) {
            if (Object.keys(obj).length === 0) return true;
        }
        return false;
    },
    /**
     * Convert Obj to Arr
     */
    objToArr: obj => Object.keys(obj).map(k => obj[k]),
    /**
     * Limit characters, placing a ... at the end
     */
    limitChars: (str, limit = 15) => {
        if (str.length > limit) return `${str.substr(0, limit).trim()} ...`;
        return str;
    },
    /**
     * Convert all HTMLEntities when Array
     */
    convertHtmlEntitiesArray: (arr) => {
        const finalArr = arr;

        if (arr instanceof Array) {
            arr.forEach((item, key) => {
                if (item instanceof Array) {
                    finalArr[key] = UTIL.convertHtmlEntitiesArray(item);
                } else if (typeof item === 'object') {
                    finalArr[key] = UTIL.convertHtmlEntitiesObject(item);
                }
            });
        }
        return finalArr;
    },
    /**
     * Convert all HTMLEntities when Object
     */
    convertHtmlEntitiesObject: (obj) => {
        const finalObj = obj;

        if (typeof obj === 'object' && !(obj instanceof Array)) {
            Object.keys(obj).forEach((key) => {
                const item = obj[key];

                if (item instanceof Array) {
                    finalObj[key] = UTIL.convertHtmlEntitiesArray(item);
                } else if (typeof item === 'object') {
                    finalObj[key] = UTIL.convertHtmlEntitiesObject(item);
                }
            });
        }

        return finalObj;
    },
    /**
     * Strips all HTML tags
     */
    stripTags: str => striptags(str),
    /**
     * Check for valid URL
     * */
    isUrl: (s) => {
        try {
            new URL(s);
        } catch {
            return false;
        }
        return true;
    }
};

/* Export ==================================================================== */
export default UTIL;
