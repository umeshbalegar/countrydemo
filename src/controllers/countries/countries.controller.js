'use strict';

const co = require('co');
const errors = require('restify-errors');
const countryHelper = require('../../lib/country-helper');

/**
 * I have created an equivalient function in the country-helper file
 * which retrieves the countries and serves the request.
 * The resillience for the service is handled in the country-helper file
 * @see ../../lib/country-helper.js
 */
exports.getCountries = co.wrap(function* getCountries(req, res, next) {
  try {
    const countries = yield countryHelper.getAsyncCountries();
    res.json(countries);
    return next();
  } catch (err) {
    return next(new errors.InternalServerError(err, 'Server error retrieving countries.'));
  }
});
