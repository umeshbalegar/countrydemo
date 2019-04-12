'use strict';

const RequestHelper = require('../service/httpservice/RequestUtils');
const config = require('../config');
const LocalCache = require('../service/cacheservice/Cache');

let countries = [
  'Afghanistan',
  'AFRICA',
  'Albania',
  'Algeria',
  'Angola',
  'Antigua and Barbuda',
  'Arab Rep of Egypt',
  'Argentina',
  'Armenia',
  'Aruba',
  'ASIA',
  'Australia',
  'Australia/New Zealand',
  'Austria',
  'Azerbaijan'
];

exports.getCountries = function getCountries() {
  // using mock data for now
  return countries;
};

/**
 * Assumption : As this is country list we dont need to pull this information over and over again,
 *              we can strore this in our cache and serve the requests from that.
 *              If for some reason we have cache failure we then go to the service and fetch it.
 *
 * This method will pull check the cache if country list is present,
 *  - if Yes , then it serves the request with that cache value.
 *  - else gets it from the service and updates the cache.
 *  - if everything fails it serves the static list above.
 *
 *
 */
exports.getAsyncCountries = async function getAsyncCountries() {
  let resp = await LocalCache.retrieveKey('countries');
  if (resp) {
    return resp;
  }
  resp = await RequestHelper.fetchUrl(`${config.populationservice.baseurl}/countries`);
  if (resp && resp.countries) {
    await LocalCache.setKey('countries', resp.countries, 0);
    return resp.countries;
  }
  return countries;
};
