'use strict';

const co = require('co');
const errors = require('restify-errors');
const pHelper = require('../../lib/population-helper');
const Util = require('../../lib/util');

/**
 * Very similar to country-controller,
 * I have created an helper function in the population-helper file
 * which retrieves the populations for the countries provided, also sorts based on the user input
 * and serves the request.
 * The resillience for the service is handled in the population-helper file
 * @see ../../lib/population-helper.js
 *
 * This function does some basic validation check to make sure we are getting the correct json body.
 * If not appropriate errors are thron.
 *
 * If everything looks good w.r.t request body, I pull the pouplation info.
 * sort is optional, You can specify either 'ASC' or 'DESC' or nothing at all.
 */
exports.getPopulation = co.wrap(function* getPopulation(req, res, next) {
  try {
    const input = req.body || {};
    if (input === null || input === {}) {
      return next(
        new errors.BadRequestError('Invalid input, expected {countries : [] , sort: asc/desc}'));
    }
    if (!input.countries) {
      return next(new errors.BadRequestError('Invalid input, countries is required attribute'));
    }
    if (!Util.isArray(input.countries)) {
      return next(new errors.BadRequestError('Invalid input, countries should be an array'));
    }
    const population = yield pHelper.getPopulationCounts(input.countries, input.sort);
    res.json(population);
    return next();
  } catch (err) {
    return next(new errors.InternalServerError(err, 'Server error retrieving countries.'));
  }
});
