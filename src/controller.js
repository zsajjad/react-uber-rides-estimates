import QS from 'query-string';

const BASE_URL = 'https://api.uber.com/v1.2';
const DEEPLINK_BASE = 'uber://';
const UNIVERSAL_BASE = 'https://m.uber.com/ul/';
/**
 * Basic Header
 * All other headers will extend this object
 */

const HEADER = {
  'Content-Type': 'application/json',
};

/**
 * For all external call
 */
const fetchApi = (url, method = 'GET', headers = {}) =>
  new Promise((resolve, reject) => {
    fetch(url, {
      method,
      headers,
    })
      .then((response) => {
        if (response.status >= 400) {
          response.json().then((responseData) => {
            reject(responseData);
          });
          return;
        }
        response.json().then((responseData) => {
          resolve(responseData);
        });
      })
      .catch((error) => {
        error.json().then((errorData) => {
          reject(errorData);
        });
      });
  });

const getServerHeader = (params) => ({
  ...HEADER,
  Authorization: `TOKEN ${params.serverToken}`,
  'Accept-Language': params.language,
});

const stringifyLinkQuery = (query) => {
  const arr = Object.keys(query).map((key) => `${key}=${encodeURI(query[key])}`);
  return arr.join('&');
};

/**
 * method: getTimeEstimates
 * params: cliendId, language, pickupLocation, dropoffLocation
 */
export const getTimeEstimates = (params) => {
  const query = {
    start_latitude: params.pickupLocation.latitude,
    start_longitude: params.pickupLocation.longitude,
    product_id: params.productId,
  };
  const url = `${BASE_URL}/estimates/time?${QS.stringify(query)}`;
  return fetchApi(url, 'GET', getServerHeader(params));
};

/**
 * method: getTimeEstimates
 * params: cliendId, language, pickupLocation, dropoffLocation
 */
export const getPriceEstimate = (params) => {
  const query = {
    start_latitude: params.pickupLocation.latitude,
    start_longitude: params.pickupLocation.longitude,
    end_latitude: params.dropoffLocation.latitude,
    end_longitude: params.dropoffLocation.longitude,
    seat_count: params.seatCount,
  };
  const url = `${BASE_URL}/estimates/price?${QS.stringify(query)}`;
  return fetchApi(url, 'GET', getServerHeader(params));
};

export const getLinks = (params, data) => {
  const query = {
    clientId: params.clientId,
    action: 'setPickup',
  };
  if (params.useCurrentLocation) {
    query.pickup = 'my_location';
  } else {
    query['pickup[latitude]'] = params.pickupLocation.latitude;
    query['pickup[longitude]'] = params.pickupLocation.longitude;
    query['pickup[nickname]'] = params.pickupLocation.nickname;
    query['pickup[formatted_address]'] = params.pickupLocation.formattedAddress;
  }

  if (params.dropoffLocation) {
    query['dropoff[latitude]'] = params.dropoffLocation.latitude;
    query['dropoff[longitude]'] = params.dropoffLocation.longitude;
    query['dropoff[nickname]'] = params.dropoffLocation.nickname;
    query['dropoff[formatted_address]'] =
      params.dropoffLocation.formattedAddress;
  }

  if (params.brandingText) {
    query.link_text = params.brandingText;
  }

  if (params.partnerDeeplink) {
    query.partner_deeplink = params.partnerDeeplink;
  }

  return data.map((product) => {
    query.product_id = product.product_id;
    return {
      ...product,
      deepLink: `${DEEPLINK_BASE}?${stringifyLinkQuery(query)}`,
      universalLink: `${UNIVERSAL_BASE}?${stringifyLinkQuery(query)}`,
    };
  });
};
