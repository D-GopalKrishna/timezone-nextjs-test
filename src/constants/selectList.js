import {Countries, Currency} from './index';

const SelectList = {
  /**
   * Expand Phone number
   */
  countryList: () => {
    return Countries.map((data) => ({
      'value': data.code,
      'label': data.name,
    }));
  },
  phoneCountryCode: () => {
    return Countries.map((data) => ({
      'value': data.phone,
      'label': data.name + ' (' + data.phone + ')',
    }));
  },
  currencyList: () => {
    return Currency.map((data) => ({
      'value': data.code,
      'label': data.code + ' (' + data.country + ')',
    }));
  },
};

export default SelectList;